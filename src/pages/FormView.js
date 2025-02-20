"use client"

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Card } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"

export default function FormView() {
  const { formId } = useParams()
  const [form, setForm] = useState(null)
  const [formData, setFormData] = useState({})

  useEffect(() => {
    const loadForm = async () => {
      try {
        const response = await fetch(`/api/forms/${formId}`)
        const data = await response.json()
        setForm(data.form)
      } catch (error) {
        console.error("Error loading form:", error)
      }
    }

    loadForm()
  }, [formId])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const submitData = new FormData()
    Object.keys(formData).forEach((key) => {
      if (formData[key] instanceof File) {
        submitData.append(key, formData[key])
      } else {
        submitData.append(key, formData[key])
      }
    })

    try {
      const response = await fetch("/api/submit-form", {
        method: "POST",
        body: submitData,
      })

      if (response.ok) {
        alert("Form submitted successfully!")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
    }
  }

  const handleChange = (id, value, type = "text") => {
    if (type === "file") {
      setFormData({ ...formData, [id]: value.target.files[0] })
    } else {
      setFormData({ ...formData, [id]: value })
    }
  }

  if (!form) return <div>Loading...</div>

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <Card>
          <h2 className="text-2xl font-bold mb-6">{form.name}</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {form.fields.map((field) => (
              <div key={field.id}>
                <label className="block text-sm font-medium mb-1">{field.label}</label>
                {field.type === "textarea" ? (
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={formData[field.id] || ""}
                    onChange={(e) => handleChange(field.id, e.target.value)}
                    required={field.required}
                  />
                ) : field.type === "file" ? (
                  <Input type="file" onChange={(e) => handleChange(field.id, e, "file")} required={field.required} />
                ) : (
                  <Input
                    type={field.type}
                    value={formData[field.id] || ""}
                    onChange={(e) => handleChange(field.id, e.target.value)}
                    required={field.required}
                  />
                )}
              </div>
            ))}
            <Button type="submit">Submit</Button>
          </form>
        </Card>
      </div>
    </div>
  )
}

