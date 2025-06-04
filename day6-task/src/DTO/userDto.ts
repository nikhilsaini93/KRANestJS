import { Type } from "class-transformer";
import { IsDate, IsDateString, IsInt, IsNotEmpty, IsString, Length, Matches, Max, Min } from "class-validator";


export class userDto{
    @IsString({message : "name should be string"})
    @Matches(/^[A-Za-z]+(?:\s[A-Za-z]+)*$/ ,{message : "name should contain only alphabets and contains only one space"})
    @Length( 1, 40)
    name : string

    @IsInt({message : "age should be number"})
    @Min(1 ,{message : "age should be greater than 1"})
    @Max(110 ,{message : "age should be less than 110"})
    age : number


    // @IsDateString({})
    // @Type(() => Date)
    // dob : string
  @IsNotEmpty()
  @Type(() => Date)
  @IsDate({message : "date is not valid"})
  myDate: Date






}