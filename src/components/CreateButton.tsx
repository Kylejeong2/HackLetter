"use client"
import React from 'react'
import { Button } from './ui/button'
// import { useMutation } from '@tanstack/react-query'
import axios from "axios"

// used for testing 

const CreateButton = () => {
    const handleLetter = async () => {
        const response = await axios.get('/api/sendLetter');

        if (response.status === 200) {
            const { name, content } = await response.data;
            const res = await axios.post('/api/saveLetter', {
                name: name,
                content: content
            })
            return res.data
            
        } else {
            // Handle error
            throw new Error('Failed to send letter');
        }
    }

  return (
    <Button onClick={handleLetter}>
        Create Letter
    </Button>
  )
}

export default CreateButton;