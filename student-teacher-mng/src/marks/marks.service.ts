// marks.service.ts
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentDetail } from 'src/student-details/entities/student-detail.entity';
import { Repository } from 'typeorm';
import { parse } from 'json2csv';
import * as PDFDocument from 'pdfkit';
import { Response } from 'express';
import { CreateMarkDto } from './dto/create-mark.dto';
import { UpdateMarkDto } from './dto/update-mark.dto';
import { Mark } from './entities/mark.entity';
import { Subject } from 'src/subject/entities/subject.entity';

@Injectable()
export class MarksService {
  constructor(
    @InjectRepository(Mark)
    private readonly markRepository: Repository<Mark>,
    @InjectRepository(StudentDetail)
    private readonly studentDetailRepository: Repository<StudentDetail>,
    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>,
  ) {}

  async create(createMarkDto: CreateMarkDto) {
    const { studentDetailId, subjectId, semester, marks } = createMarkDto;

    const studentDetail = await this.studentDetailRepository.findOne({
      where: { id: studentDetailId },
      relations: ['subjects'],
    });
    if (!studentDetail) {
      throw new NotFoundException(
        `StudentDetail with ID ${studentDetailId} not found.`,
      );
    }

    const subject = await this.subjectRepository.findOneBy({ id: subjectId });
    if (!subject) {
      throw new NotFoundException(`Subject with ID ${subjectId} not found.`);
    }

    const isEnrolled = studentDetail.subjects.some((s) => s.id === subject.id);
    if (!isEnrolled) {
      throw new BadRequestException(
        `Student is not enrolled in subject '${subject.name}'.`,
      );
    }

    const existingMark = await this.markRepository.findOneBy({
      studentDetail: { id: studentDetailId },
      subject: { id: subjectId },
      semester,
    });

    if (existingMark) {
      throw new BadRequestException(
        `Marks for this student, subject, and semester already exist.`,
      );
    }

    const newMark = this.markRepository.create({
      studentDetail,
      subject,
      semester,
      marks,
    });

    return this.markRepository.save(newMark);
  }

  // private passingMarks = 40;

  // async generateResult(userId: number, format: 'csv' | 'pdf', res: Response) {
  //   const student = await this.studentDetailRepository.findOne({
  //     where: { user: { id: userId } },
  //     relations: ['marks', 'marks.subject', 'user'],
  //   });

  //   if (!student) throw new NotFoundException('Student not found');

  //   const resultRows: {
  //     Subject: string;
  //     Semester?: string;
  //     Marks: number | string;
  //     Status?: string;
  //   }[] = [];
  //   let total = 0;

  //   for (const mark of student.marks) {
  //     total += mark.marks;
  //     resultRows.push({
  //       Subject: mark.subject.name,
  //       Semester: `SEM${mark.semester}`,
  //       Marks: mark.marks,
  //       Status: mark.marks >= this.passingMarks ? 'Pass' : 'Fail',
  //     });
  //   }

  //   const percentage = (total / (student.marks.length * 100)) * 100;
  //   const isOverallPass = resultRows.every((row) => row.Status === 'Pass');

  //   resultRows.push(
  //     { Subject: 'Total', Marks: total },
  //     { Subject: 'Percentage', Marks: `${percentage.toFixed(2)}%` },
  //     { Subject: 'Overall Status', Marks: isOverallPass ? 'Pass' : 'Fail' },
  //   );

  //   if (format === 'csv') {
  //     const csv = parse(resultRows);
  //     res.setHeader('Content-Type', 'text/csv');
  //     res.setHeader(
  //       'Content-Disposition',
  //       `attachment; filename=student_${userId}_result.csv`,
  //     );
  //     console.log(csv)
  //     return res.send(csv);
  //   }

  //   if (format === 'pdf') {
  //     const doc = new PDFDocument();
  //     res.setHeader('Content-Type', 'application/pdf');
  //     res.setHeader(
  //       'Content-Disposition',
  //       `attachment; filename=student_${userId}_result.pdf`,
  //     );
  //     doc.pipe(res);
  //     doc
  //       .fontSize(18)
  //       .text(`Result for ${student.user.name}`, { align: 'center' });
  //     doc.moveDown();

  //     resultRows.forEach((row) => {
  //       doc
  //         .fontSize(12)
  //         .text(
  //           `${row.Subject || ''} | ${row.Semester || ''} | ${row.Marks || ''} ${row.Status ? '| ' + row.Status : ''}`,
  //         );
  //     });

  //     doc.end();
  //   }
  // }

  private passingMarks = 40;

async generateResult(userId: number, format: 'csv' | 'pdf', res: Response) {
  const student = await this.studentDetailRepository.findOne({
    where: { user: { id: userId } },
    relations: ['marks', 'marks.subject', 'user'],
  });

  if (!student) throw new NotFoundException('Student not found');

  const sem1Marks = student.marks.filter((m) => m.semester === 1);
  const sem2Marks = student.marks.filter((m) => m.semester === 2);

  const resultRows: {
    Subject: string;
    Semester?: string;
    Marks: number | string;
    Status?: string;
  }[] = [];

  let sem1Total = 0;
  for (const mark of sem1Marks) {
    sem1Total += mark.marks;
    resultRows.push({
      Subject: mark.subject.name,
      Semester: 'SEM1',
      Marks: mark.marks,
      Status: mark.marks >= this.passingMarks ? 'Pass' : 'Fail',
    });
  }

  let sem2Total = 0;
  for (const mark of sem2Marks) {
    sem2Total += mark.marks;
    resultRows.push({
      Subject: mark.subject.name,
      Semester: 'SEM2',
      Marks: mark.marks,
      Status: mark.marks >= this.passingMarks ? 'Pass' : 'Fail',
    });
  }

  const sem1Percentage = sem1Marks.length
    ? (sem1Total / (sem1Marks.length * 100)) * 100
    : 0;

  const sem2Percentage = sem2Marks.length
    ? (sem2Total / (sem2Marks.length * 100)) * 100
    : 0;

  // Determine semester status based on percentage
  const getSemStatus = (percentage: number): 'Pass' | 'Promoted' | 'Fail' => {
    if (percentage >= 40) return 'Pass';
    if (percentage >= 35) return 'Promoted';
    return 'Fail';
  };

  const sem1Status = getSemStatus(sem1Percentage);
  const sem2Status = getSemStatus(sem2Percentage);

  const avgPercentage = (sem1Percentage + sem2Percentage) / 2;
  const yearStatus = getSemStatus(avgPercentage);

  // Add semester summary rows
  resultRows.push(
    { Subject: 'SEM1 Total', Marks: sem1Total },
    { Subject: 'SEM1 Percentage', Marks: `${sem1Percentage.toFixed(2)}%` },
    { Subject: 'SEM1 Status', Marks: sem1Status },
    { Subject: 'SEM2 Total', Marks: sem2Total },
    { Subject: 'SEM2 Percentage', Marks: `${sem2Percentage.toFixed(2)}%` },
    { Subject: 'SEM2 Status', Marks: sem2Status },
    { Subject: 'Year Average', Marks: `${avgPercentage.toFixed(2)}%` },
    { Subject: 'Year Status', Marks: yearStatus }
  );

  // CSV output
  if (format === 'csv') {
    const csv = parse(resultRows);
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=student_${userId}_result.csv`,
    );
    return res.send(csv);
  }

  // Enhanced PDF output
  if (format === 'pdf') {
    const doc = new PDFDocument({ margin: 40 });
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=student_${userId}_result.pdf`,
    );
    doc.pipe(res);

    // Eye-catching Aqua color scheme
    const primaryColor = '#00bcd4';      // Bright aqua
    const secondaryColor = '#e0f7fa';    // Light aqua background
    const accentColor = '#00acc1';       // Darker aqua
    const successColor = '#4caf50';      // Bright green
    const warningColor = '#ff9800';      // Bright orange
    const errorColor = '#f44336';        // Bright red
    const textColor = '#263238';         // Dark blue-gray
    const lightGray = '#b2dfdb';         // Aqua-tinted gray

    // Helper function to get status color
    const getStatusColor = (status: string) => {
      switch (status) {
        case 'Pass': return successColor;
        case 'Promoted': return warningColor;
        case 'Fail': return errorColor;
        default: return textColor;
      }
    };

    // Header with vibrant aqua gradient effect
    doc.rect(0, 0, doc.page.width, 120).fill(primaryColor);
    
    // Add a gradient-like effect with overlapping rectangles
    doc.rect(0, 0, doc.page.width, 40).fill(accentColor);
    
    // Institution logo area with aqua styling
    doc.circle(70, 60, 25).fill('white');
    doc.fillColor(primaryColor).fontSize(20).text('LOGO', 55, 55);
    
    // Header text with shadow effect
    doc.fillColor('white')
       .fontSize(26)
       .font('Helvetica-Bold')
       .text('ACADEMIC RESULT REPORT', 120, 35);
    
    doc.fontSize(14)
       .font('Helvetica')
       .text('Academic Year 2024-25', 120, 65);

    // Student information section with aqua styling
    doc.fillColor(textColor);
    let yPosition = 150;
    
    // Student info background with aqua theme
    doc.rect(40, yPosition - 10, doc.page.width - 80, 80)
       .fill(secondaryColor)
       .stroke(primaryColor);
    
    doc.fillColor(accentColor)
       .fontSize(16)
       .font('Helvetica-Bold')
       .text('STUDENT INFORMATION', 60, yPosition);
    
    yPosition += 25;
    doc.fillColor(textColor)
       .fontSize(12)
       .font('Helvetica')
       .text(`Name: ${student.user.name}`, 60, yPosition)
       .text(`Student ID: ${userId}`, 300, yPosition);
    
    yPosition += 20;
    doc.text(`Report Generated: ${new Date().toLocaleDateString()}`, 60, yPosition);

    yPosition += 50;

    // Semester 1 Results
    this.drawSemesterSection(doc, 'SEMESTER 1 RESULTS', sem1Marks, yPosition, primaryColor, accentColor, successColor, errorColor, textColor, lightGray, secondaryColor);
    yPosition += 40 + (sem1Marks.length * 25) + 30;

    // Semester 2 Results
    this.drawSemesterSection(doc, 'SEMESTER 2 RESULTS', sem2Marks, yPosition, primaryColor, accentColor, successColor, errorColor, textColor, lightGray, secondaryColor);
    yPosition += 40 + (sem2Marks.length * 25) + 50;

    // Enhanced Summary section with aqua theme
    doc.rect(40, yPosition - 10, doc.page.width - 80, 140)
       .fill(secondaryColor)
       .stroke(primaryColor);
    
    doc.fillColor(accentColor)
       .fontSize(18)
       .font('Helvetica-Bold')
       .text('ACADEMIC SUMMARY', 60, yPosition);
    
    yPosition += 35;
    
    // Summary table with better spacing and colors
    const summaryData = [
      ['Semester 1 Total', sem1Total.toString(), sem1Percentage.toFixed(2) + '%', sem1Status],
      ['Semester 2 Total', sem2Total.toString(), sem2Percentage.toFixed(2) + '%', sem2Status],
      ['Overall Average', '---', avgPercentage.toFixed(2) + '%', yearStatus]
    ];
    
    this.drawSummaryTable(doc, summaryData, yPosition, successColor, warningColor, errorColor, textColor, primaryColor);
    
    yPosition += 110;

    // Enhanced Grade scale legend with aqua styling
    doc.rect(40, yPosition - 5, doc.page.width - 80, 40)
       .fill('#f0fdff')
       .stroke(lightGray);
    
    doc.fillColor(accentColor)
       .fontSize(12)
       .font('Helvetica-Bold')
       .text('GRADING SCALE', 60, yPosition);
    
    yPosition += 20;
    doc.fillColor(textColor)
       .fontSize(10)
       .font('Helvetica')
       .text('🟢 Pass: ≥40%', 60, yPosition)
       .text('🟡 Promoted: 35-39%', 170, yPosition)
       .text('🔴 Fail: <35%', 300, yPosition);

    // Enhanced Footer with aqua gradient
    yPosition = doc.page.height - 100;
    doc.rect(0, yPosition, doc.page.width, 100).fill(primaryColor);
    doc.rect(0, yPosition, doc.page.width, 30).fill(accentColor);
    
    doc.fillColor('white')
       .fontSize(12)
       .font('Helvetica-Bold')
       .text('This is a computer-generated document. No signature is required.', 
             60, yPosition + 20, { align: 'center', width: doc.page.width - 120 });
    
    doc.fontSize(10)
       .font('Helvetica')
       .text('For queries, contact: academic@institution.edu', 
             60, yPosition + 50, { align: 'center', width: doc.page.width - 120 });

    doc.end();
  }
}

// Helper method to draw semester section with aqua theme
private drawSemesterSection(doc: any, title: string, marks: any[], yPosition: number, 
                           primaryColor: string, accentColor: string, successColor: string, 
                           errorColor: string, textColor: string, lightGray: string, secondaryColor: string) {
  // Section header with aqua styling
  doc.fillColor(accentColor)
     .fontSize(16)
     .font('Helvetica-Bold')
     .text(title, 60, yPosition);
  
  yPosition += 30;
  
  // Table header with aqua theme
  doc.rect(40, yPosition - 5, doc.page.width - 80, 30)
     .fill(primaryColor)
     .stroke(accentColor);
  
  doc.fillColor('white')
     .fontSize(12)
     .font('Helvetica-Bold')
     .text('SUBJECT', 60, yPosition + 5)
     .text('MARKS', 300, yPosition + 5)
     .text('STATUS', 420, yPosition + 5);
  
  yPosition += 30;
  
  // Table rows with enhanced styling
  marks.forEach((mark, index) => {
    const bgColor = index % 2 === 0 ? '#ffffff' : secondaryColor;
    doc.rect(40, yPosition - 5, doc.page.width - 80, 25)
       .fill(bgColor)
       .stroke(lightGray);
    
    const status = mark.marks >= this.passingMarks ? 'Pass' : 'Fail';
    const statusColor = status === 'Pass' ? successColor : errorColor;
    
    doc.fillColor(textColor)
       .fontSize(11)
       .font('Helvetica')
       .text(mark.subject.name, 60, yPosition)
       .text(mark.marks.toString(), 300, yPosition);
    
    doc.fillColor(statusColor)
       .font('Helvetica-Bold')
       .text(status, 420, yPosition);
    
    yPosition += 25;
  });
}

// Helper method to draw summary table with enhanced styling
private drawSummaryTable(doc: any, data: string[][], yPosition: number, 
                        successColor: string, warningColor: string, errorColor: string, 
                        textColor: string, primaryColor: string) {
  
  // Table header
  doc.rect(40, yPosition - 5, doc.page.width - 80, 25)
     .fill(primaryColor)
     .stroke(primaryColor);
  
  doc.fillColor('white')
     .fontSize(11)
     .font('Helvetica-Bold')
     .text('DESCRIPTION', 60, yPosition)
     .text('TOTAL', 200, yPosition)
     .text('PERCENTAGE', 280, yPosition)
     .text('STATUS', 400, yPosition);
  
  yPosition += 25;
  
  data.forEach((row, index) => {
    const [label, total, percentage, status] = row;
    
    // Row background
    const bgColor = index % 2 === 0 ? '#ffffff' : '#f0fdff';
    doc.rect(40, yPosition - 5, doc.page.width - 80, 25)
       .fill(bgColor)
       .stroke('#b2dfdb');
    
    doc.fillColor(textColor)
       .fontSize(11)
       .font('Helvetica')
       .text(label, 60, yPosition)
       .text(total, 200, yPosition)
       .text(percentage, 280, yPosition);
    
    // Status with proper color coding
    let statusColor = textColor;
    if (status === 'Pass') statusColor = successColor;
    else if (status === 'Promoted') statusColor = warningColor;
    else if (status === 'Fail') statusColor = errorColor;
    
    doc.fillColor(statusColor)
       .font('Helvetica-Bold')
       .text(status, 400, yPosition);
    
    yPosition += 25;
  });
}

  findAll() {
    return `This action returns all marks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mark`;
  }

  update(id: number, updateMarkDto: UpdateMarkDto) {
    return `This action updates a #${id} mark`;
  }

  remove(id: number) {
    return `This action removes a #${id} mark`;
  }
}
