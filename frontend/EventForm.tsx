import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function EventForm() {
  const [step, setStep] = useState(1);
  const [eventName, setEventName] = useState('');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [pickupDate, setPickupDate] = useState('');
  const [duration, setDuration] = useState('');
  const [returnAmount, setReturnAmount] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [adharFile, setAdharFile] = useState<File | null>(null);
  const [address, setAddress] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files).slice(0, 5);
      setFiles(selectedFiles);
    }
  };

  const handleAdharChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAdharFile(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    const formData = {
      eventName,
      description,
      pickupDate,
      duration,
      returnAmount,
      name,
      email,
      phone,
      address,
      files,
      adharFileName: adharFile?.name || 'Not uploaded',
    };
    console.log('Submitted Data:', formData);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100 p-4">
      <div className="bg-white w-full max-w-3xl rounded-xl shadow-md p-6">
        <div className="flex space-x-4 mb-6 border-b pb-2">
          <span className={`font-semibold ${step === 1 ? 'text-blue-500' : 'text-gray-400'}`}>Basic Info</span>
          <span className={`font-semibold ${step === 2 ? 'text-blue-500' : 'text-gray-400'}`}>Date and Time</span>
          <span className={`font-semibold ${step === 3 ? 'text-blue-500' : 'text-gray-400'}`}>Personal Information</span>
        </div>

        {step === 1 && (
          <div className="flex gap-8">
            <div className="flex-1 border-2 border-dashed border-blue-300 rounded-lg p-6 text-center">
              <div className="mb-4">
                <Button
                  component="label"
                  variant="contained"
                  startIcon={<CloudUploadIcon />}
                  className="bg-blue-500 hover:bg-blue-600"
                >
                  Upload Files
                  <VisuallyHiddenInput
                    type="file"
                    accept=".png,.jpg,.jpeg,.pdf"
                    multiple
                    onChange={handleFileChange}
                  />
                </Button>
                <p className="text-xs text-gray-400 mt-2">Only PNG, JPG, PDF supported (max 5).</p>
              </div>

              {files.length > 0 && (
                <div className="mt-4 text-left">
                  <p className="font-semibold mb-2">Selected Files:</p>
                  <ul className="list-disc list-inside text-sm text-gray-700">
                    {files.map((file, idx) => (
                      <li key={idx}>{file.name}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="flex-1 space-y-4">
              <div>
                <label className="block font-semibold">Event Name</label>
                <input
                  type="text"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  className="w-full border rounded px-3 py-2 mt-1"
                  placeholder="Enter event or purpose"
                />
              </div>
              <div>
                <label className="block font-semibold">Description</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border rounded px-3 py-2 mt-1"
                  placeholder="Details about your event or purpose"
                ></textarea>
              </div>
              <div className="mt-4 flex justify-between">
                <div></div>
                <button onClick={() => setStep(2)} className="bg-blue-500 text-white px-6 py-2 rounded">
                  Next →
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div>
              <label className="block font-semibold">Pickup Date</label>
              <input
                type="date"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                className="w-full border rounded px-3 py-2 mt-1"
              />
            </div>
            <div>
              <label className="block font-semibold">Duration (in months)</label>
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full border rounded px-3 py-2 mt-1"
              />
            </div>
            <div>
              <label className="block font-semibold">Expected Return Money</label>
              <input
                type="number"
                value={returnAmount}
                onChange={(e) => setReturnAmount(e.target.value)}
                className="w-full border rounded px-3 py-2 mt-1"
              />
            </div>
            <div className="flex justify-between">
              <button onClick={() => setStep(1)} className="bg-gray-400 text-white px-6 py-2 rounded">
                ← Previous
              </button>
              <button onClick={() => setStep(3)} className="bg-blue-500 text-white px-6 py-2 rounded">
                Next →
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <div>
              <label className="block font-semibold">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border rounded px-3 py-2 mt-1"
              />
            </div>
            <div>
              <label className="block font-semibold">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded px-3 py-2 mt-1"
              />
            </div>
            <div>
              <label className="block font-semibold">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border rounded px-3 py-2 mt-1"
              />
            </div>
            <div>
              <label className="block font-semibold">Upload Aadhar Card</label>
              <input
                type="file"
                accept=".png,.jpg,.jpeg,.pdf"
                onChange={handleAdharChange}
                className="w-full border rounded px-3 py-2 mt-1"
              />
            </div>
            <div>
              <label className="block font-semibold">Address</label>
              <textarea
                rows={3}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full border rounded px-3 py-2 mt-1"
              ></textarea>
            </div>
            <div className="flex justify-between">
              <button onClick={() => setStep(2)} className="bg-gray-400 text-white px-6 py-2 rounded">
                ← Previous
              </button>
              <button onClick={handleSubmit} className="bg-green-500 text-white px-6 py-2 rounded">
                Submit
              </button>
            </div>
          </div>
        )}

        {submitted && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 text-center shadow-xl">
              <h2 className="text-lg font-semibold text-green-600 mb-2">Successfully Submitted</h2>
              <p className="text-gray-600">Your form has been submitted successfully!</p>
              <button onClick={() => setSubmitted(false)} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
