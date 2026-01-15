import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

export function AddJobDialog() {
  const [open, setOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("submitted")
    setOpen(false)
  }
  return <Dialog open={open} onOpenChange={setOpen} >
    <DialogTrigger asChild>
      <Button size="lg">Add Job</Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          Add New Job
        </DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="grid gap-4 py-4">
        <div className="grid gap-2">
          <Label htmlFor="company">Company Name</Label>
          <Input id="company" placeholder="Google, Vercel, etc." required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="role">Role</Label>
          <Input id="role" placeholder="Software Engineer" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="jd">Job Description</Label>
          <Textarea id="jd" placeholder="Paste the JD here for AI analysis..." className="min-h-[100px]" />
        </div>
        <Button type="submit" className="w-full">Save Job</Button>
      </form>
    </DialogContent>
  </Dialog>

}
