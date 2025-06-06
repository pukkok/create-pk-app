#!/usr/bin/env node

import inquirer from 'inquirer'
import { execSync } from 'child_process'
import fs from 'fs'
import fsPromises from 'fs/promises'

console.log('🔧 create-pk-project 시작')

const { projectType, useTailwind, projectName } = await inquirer.prompt([
  {
    type: 'input',
    name: 'projectName',
    message: '생성할 프로젝트 이름은?',
    default: 'pk-app'
  },
  {
    type: 'list',
    name: 'projectType',
    message: '어떤 프로젝트를 생성할까요?',
    choices: ['Vite', 'Next.js']
  },
  {
    type: 'confirm',
    name: 'useTailwind',
    message: 'Tailwind를 포함할까요?',
    default: true
  }
])

if (!fs.existsSync(projectName)) fs.mkdirSync(projectName)
process.chdir(projectName)

if (projectType === 'Vite') {
  execSync('yarn create vite . --template react', { stdio: 'inherit' })
  execSync('yarn', { stdio: 'inherit' })

  if (useTailwind) {
    console.log('💨 Tailwind 설치 중...')
    execSync('yarn add -D tailwindcss postcss autoprefixer', { stdio: 'inherit' })
    execSync('npx tailwindcss init -p', { stdio: 'inherit' })

    const tailwindConfig = `
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: { extend: {} },
  plugins: [],
}`
    await fsPromises.writeFile('tailwind.config.js', tailwindConfig)
    console.log('✅ Tailwind 설정 완료')
  }
}

if (projectType === 'Next.js') {
  execSync('yarn create next-app .', { stdio: 'inherit' })

  if (useTailwind) {
    console.log('💨 Tailwind 설치 중...')
    execSync('yarn add -D tailwindcss postcss autoprefixer', { stdio: 'inherit' })
    execSync('npx tailwindcss init -p', { stdio: 'inherit' })

    const tailwindConfig = `export default {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: { extend: {} },
  plugins: [],
}`
    await fsPromises.writeFile('tailwind.config.js', tailwindConfig)
    console.log('✅ Tailwind 설정 완료')
  }
}

console.log(`🎉 ${projectName} 생성 완료!`)
