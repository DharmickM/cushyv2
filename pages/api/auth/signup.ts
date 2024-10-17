import type { NextApiRequest, NextApiResponse } from 'next'
import { hash } from 'bcryptjs'

// This is a mock function. In a real application, you would use a database.
async function createUser(name: string, email: string, password: string) {
  // Here you would typically insert the user into your database
  console.log(`Creating user: ${name}, ${email}`)
  // Return a mock user object
  return { id: '1', name, email }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { name, email, password } = req.body

    // Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Missing fields' })
    }

    // Check if user already exists (mock check)
    // In a real app, you would query your database here
    if (email === 'user@example.com') {
      return res.status(400).json({ message: 'User already exists' })
    }

    // Hash password
    const hashedPassword = await hash(password, 12)

    // Create user
    const user = await createUser(name, email, hashedPassword)

    res.status(201).json({ message: 'User created successfully', user })
  } catch (error) {
    res.status(500).json({ message: 'An error occurred during sign up' })
  }
}