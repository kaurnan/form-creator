import { useNavigate } from "react-router-dom"
import { Card, CardHeader, CardTitle, CardDescription } from "../components/ui/card"
import { Button } from "../components/ui/button"

const formTypes = [
  {
    id: "candidate",
    title: "Candidate - Job Apply",
    description: "Basic job application form for candidates",
  },
  {
    id: "uae-visa",
    title: "UAE Own Visa/Freelancer Registration",
    description: "Registration form for UAE visa holders and freelancers",
  },
  {
    id: "agent",
    title: "Agents/Supplier Registration",
    description: "Registration form for agents and suppliers",
  },
  {
    id: "manpower",
    title: "Manpower Supply Company Registration",
    description: "Registration for manpower supply companies",
  },
  {
    id: "overseas",
    title: "Overseas Recruitment Company Registration",
    description: "Registration for overseas recruitment companies",
  },
  {
    id: "client",
    title: "Client Enquiry",
    description: "Detailed enquiry form for clients",
  },
]

export default function Dashboard() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Form Builder Dashboard</h1>
          <p className="text-gray-500 mt-2">Select a form type to create or edit</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {formTypes.map((form) => (
            <Card key={form.id}>
              <CardHeader>
                <CardTitle>{form.title}</CardTitle>
                <CardDescription>{form.description}</CardDescription>
              </CardHeader>
              <Button className="w-full mt-4" onClick={() => navigate(`/form-builder/${form.id}`)}>
                Create Form
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

