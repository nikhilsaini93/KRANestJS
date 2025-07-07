// scripts/generate-protos.ts

import { execSync } from 'child_process';
import { readdirSync, writeFileSync, statSync } from 'fs';
import { join, extname, basename } from 'path';

const PROTO_DIR = join(__dirname, '../proto');

// Recursively find .proto files
function findProtoFiles(dir: string): string[] {
  const entries = readdirSync(dir);
  let files: string[] = [];

  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      files = files.concat(findProtoFiles(fullPath)); // Recurse into subdirectories
    } else if (extname(fullPath) === '.proto') {
      files.push(fullPath);
    }
  }
  return files;
}

// Generate TypeScript types using ts-proto
function generateTypes(protoPath: string) {
  execSync(
    `npx protoc \
    --plugin=protoc-gen-ts_proto=${join(__dirname, '../node_modules/.bin/protoc-gen-ts_proto')} \
    --ts_proto_out=${PROTO_DIR} \
    --ts_proto_opt=outputServices=grpc-js,outputClientImpl=grpc-js \
    --proto_path=${PROTO_DIR} ${protoPath}`,
    { stdio: 'inherit' }
  );
}

// Create index.ts for each proto directory
function createIndexFile(dir: string) {
  const entries = readdirSync(dir);
  const tsFiles = entries.filter(
    (f) => f.endsWith('.ts') && f !== 'index.ts'
  );

  if (tsFiles.length === 0) {
    return; // No TypeScript files, skip index creation
  }

  // Create the export statements
  const exports = tsFiles
    .map((f) => `export * from './${basename(f, '.ts')}';`)
    .join('\n');

  // Write the updated index.ts
  writeFileSync(join(dir, 'index.ts'), exports + '\n');
}

// Update root index.ts to export all directories
function updateRootIndexFile() {
  const subDirs = readdirSync(PROTO_DIR).filter((f) => statSync(join(PROTO_DIR, f)).isDirectory());
  const exports = subDirs.map((subDir) => `export * from './${subDir}';`).join('\n');
  writeFileSync(join(PROTO_DIR, 'index.ts'), exports + '\n');
}

// Run the generator
function main() {
  const protoFiles = findProtoFiles(PROTO_DIR);

  const generatedDirs = new Set<string>();

  // Generate types and track which directories have generated files
  for (const protoFile of protoFiles) {
    generateTypes(protoFile); // Generate TypeScript for each proto file
    const dir = join(protoFile, '..');
    generatedDirs.add(dir); // Keep track of directories that need updating
  }

  // Update each directory's index.ts
  for (const dir of generatedDirs) {
    createIndexFile(dir);
  }

  // Update the root index.ts (to export everything from subdirectories)
  updateRootIndexFile();
}

main();
