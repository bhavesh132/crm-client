import { useState } from 'react';
import { Button } from '@/components/ui/button'
import { useDispatch } from 'react-redux';
import { createContact } from './contactSlice';
import Alert from '@/components/ui/Alert'

function AddContactForm() {
  const dispatch = useDispatch();
  const [alert, setAlert] = useState(null); 
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    title: '',
    company_name: 'catchall',
    contact_type: 'lead',
    email: '',
    contact_number: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newContact = {
      ...formData,
    };
    console.log(newContact)
    try {
      dispatch(createContact(newContact));
      setAlert({
        type: 'success',
        message: `Contact ${formData.first_name} created successfully!`
      })
      console.log('Form submitted:', formData);
    } catch (error) {
      setAlert({
        type: 'error',
        message: `Failed to create contact! ${error.message}`
      })
      console.error('Error creating contact:', error);
    }
  };
  

  return (
    <div className='w-full'>
        <form onSubmit={handleSubmit} className="space-y-4 mt-6 p-6 bg-white rounded-lg shadow-lg">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="first_name" className="block text-sm font-medium">First Name</label>
              <input
                id="first_name"
                name="first_name"
                type="text"
                value={formData.first_name}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="last_name" className="block text-sm font-medium">Last Name</label>
              <input
                id="last_name"
                name="last_name"
                type="text"
                value={formData.last_name}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div>
            <label htmlFor="title" className="block text-sm font-medium">Title</label>
            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="company_name" className="block text-sm font-medium">Company Name</label>
            <input
              id="company_name"
              name="company_name"
              type="text"
              value={formData.company_name}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="contact_type" className="block text-sm font-medium">Contact Type</label>
            <select
              id="contact_type"
              name="contact_type"
              value={formData.contact_type}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="lead">Lead</option>
              <option value="customer">Customer</option>
              <option value="partner">Partner</option>
            </select>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="contact_number" className="block text-sm font-medium">Contact Number</label>
            <input
              id="contact_number"
              name="contact_number"
              type="text"
              value={formData.contact_number}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="created_by" className="block text-sm font-medium">Created By</label>
            <input
              id="created_by"
              name="created_by"
              type="text"
              value={JSON.parse(localStorage.getItem('user')).first_name + ' ' + JSON.parse(localStorage.getItem('user')).last_name}
              onChange={handleInputChange}
              required
              disabled
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mt-6 flex justify-center space-x-4">
            <Button
              type="submit"
              className="px-2 min-w-[196px] bg-gradient-to-r from-violet-600 to-violet-900 hover:from-violet-600 hover:to-violet-900 bg-no-repeat
                         bg-[length:5px_100%] bg-left hover:bg-[length:100%_100%] 
                          transition-all duration-30 w-fit 
                         rounded-none text-gray-800 hover:text-gray-100 m-2 hover:shadow-md bg-gray-100 border-r-0"
            >
              Save Contact
            </Button>
          </div>
        </form>
    </div>
  );
}

export default AddContactForm;
