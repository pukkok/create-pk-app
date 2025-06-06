#!/usr/bin/env node

import inquirer from 'inquirer'
import { cpSync } from 'fs'
import { fileURLToPath } from 'url'
import path from 'path'
import { execSync } from 'child_process'
console.log('🔧 create-pk-project 시작')

const { template } = await inquirer.prompt([
  {
    type: 'list',
    name: 'template',
    message: '사용할 템플릿을 선택하세요:',
    choices: [
      { name: 'Vite + Tailwind', value: 'vite-tailwind' },
      { name: 'Vite (기본)', value: 'vite-basic' }
    ]
  }
])

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const templateDir = path.join(__dirname, 'templates', template)
const targetDir = process.cwd()

console.log(`📁 템플릿 복사: ${templateDir} → ${targetDir}`)
cpSync(templateDir, targetDir, { recursive: true })

console.log('📦 의존성 설치 중...')
execSync('yarn', { stdio: 'inherit' })

console.log('✅ 템플릿 적용 및 설치 완료!')


