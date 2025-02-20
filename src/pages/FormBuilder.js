"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Card } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"

export default function FormBuilder() {
  const { formType } = useParams()
  const navigate = useNavigate()
  const [fields, setFields] = useState([])
  const [formName, setFormName] = useState("")

  useEffect(() => {
    // Load existing form if it exists
    const loadForm = async () => {
      try {
        const response = await fetch(`/api/forms/${formType}`)
        const data = await response.json()
        if (data.form) {
          setFormName(data.form.name)
          setFields(data.form.fields)
        }
      } catch (error) {
        console.error("Error loading form:", error)
      }
    }

    loadForm()
  }, [formType])

  const addField = () => {
    setFields([
      ...fields,
      {
        id: Date.now(),
        type: "text",
        label: "",
        required: false,
        options: [],
      },
    ])
  }

  const updateField = (id, updates) => {
    setFields(fields.map((field) => (field.id === id ? { ...field, ...updates } : field)))
  }

  const removeField = (id) => {
    setFields(fields.filter((field) => field.id !== id))
  }

  const handleSave = async () => {
    try {
      const response = await fetch("/api/forms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: formType,
          name: formName,
          fields,
        }),
      })

      if (response.ok) {
        navigate("/dashboard")
      }
    } catch (error) {
      console.error("Error saving form:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <Card className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Form Builder</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Form Name</label>
              <Input value={formName} onChange={(e) => setFormName(e.target.value)} placeholder="Enter form name" />
            </div>

            {fields.map((field) => (
              <Card key={field.id} className="p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Field Label</label>
                    <Input
                      value={field.label}
                      onChange={(e) => updateField(field.id, { label: e.target.value })}
                      placeholder="Enter field label"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Field Type</label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      value={field.type}
                      onChange={(e) => updateField(field.id, { type: e.target.value })}
                    >
                      <option value="text">Text</option>
                      <option value="email">Email</option>
                      <option value="tel">Phone</option>
                      <option value="file">File Upload</option>
                      <option value="textarea">Text Area</option>
                      <option value="select">Select</option>
                    </select>
                  </div>
                </div>
                <Button variant="ghost" className="mt-2" onClick={() => removeField(field.id)}>
                  Remove Field
                </Button>
              </Card>
            ))}

            <div className="flex gap-4">
              <Button onClick={addField}>Add Field</Button>
              <Button onClick={handleSave}>Save Form</Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

