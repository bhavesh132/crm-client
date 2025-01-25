import React, { useState, useEffect } from "react";
import {z} from 'zod'
import { LoaderCircle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../user/userSlice";

const contactSchema = z.object({
  first_name: z
    .string()
    .min(1, "First name is required")
    .regex(/^\S*$/, "First name cannot contain spaces"), // No spaces allowed
  last_name: z
    .string()
    .min(1, "Last name is required")
    .regex(/^\S*$/, "Last name cannot contain spaces"), // No spaces allowed
  title: z.string().min(4, "Title should have at least 4 characters"),
  company_name: z.string().optional(),
  contact_type: z.string().min(1, "Contact type is required"),
  email: z.string().email("Invalid email address. Please check the email address again"),
  contact_number: z
    .string()
});

const EditContactForm = ({ contact, onClose, onSubmit }) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [localLoading, setLocalLoading] = useState(false);
  const user = useSelector(state => state.global.user)
  const { loading, error, data } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    first_name: contact.first_name || "",
    last_name: contact.last_name || "",
    title: contact.title || "",
    company_name: contact.company_name || "",
    contact_type: contact.contact_type || "",
    email: contact.email || "",
    contact_number: contact.contact_number || "",
    owner: contact.owner || "",
  });


  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    if (data) {
      setUsers(data.data); 
    }
  }, [data]);

  useEffect(() => {
    setFormData({
      first_name: contact.first_name || "",
      last_name: contact.last_name || "",
      title: contact.title || "",
      company_name: contact.company_name || "",
      contact_type: contact.contact_type || "",
      email: contact.email || "",
      contact_number: contact.contact_number || "",
      owner: contact.owner || "",
    });
  }, [contact]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      modified_by: user.num_id
    });
  };

  const formatPhoneNumber = (value) => {
    return value
      .replace(/\D/g, "") // Remove non-digit characters
      .replace(/(\d{3})(\d{3})(\d{4})/, "$1 $2 $3") // Format as xxx xxx xxxx
      .slice(0, 12); // Limit to 12 characters (xxx xxx xxxx)
  };

const handleSubmit = (e) => {
    e.preventDefault();
    setLocalLoading(true);
    try {
      contactSchema.parse(formData);
      onSubmit(formData);
    } catch (err) {
      if (err instanceof z.ZodError) {
        const newErrors = err.errors.reduce((acc, { path, message }) => {
          acc[path[0]] = message;
          return acc;
        }, {});
        setErrors(newErrors); 
      }
    }
  };


  const userOptions = users.map((user) => {
    return ({  
      value: user.num_id,
      label: `${user.first_name} ${user.last_name}`,
    });
  })

  const content = (
       <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex space-x-4">
        <div className="flex-1">
          <label htmlFor="first_name" className="block text-sm font-semibold text-violet-700">First Name</label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={handleInputChange}
            className={`w-full p-3 rounded-md border focus:outline-none transition ${
              errors.first_name ? "bg-red-100 border-red-500" : "border-violet-100 bg-violet-50"
            }`}
            
          />
          {errors.first_name && <p className="text-red-500 text-xs">{errors.first_name}</p>}
        </div>

        <div className="flex-1">
          <label htmlFor="last_name" className="block text-sm font-semibold text-violet-700">Last Name</label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleInputChange}
            className={`w-full p-3 rounded-md border focus:outline-none transition ${
              errors.last_name ? "bg-red-100 border-red-500" : "border-violet-100 bg-violet-50"
            }`}
            
          />
          {errors.last_name && <p className="text-red-500 text-xs">{errors.last_name}</p>}
        </div>
      </div>

      {/* Title */}
      <div>
        <label htmlFor="title" className="block text-sm font-semibold text-violet-700">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          className={`w-full p-3 rounded-md border focus:outline-none transition ${
            errors.title ? "bg-red-100 border-red-500" : "border-violet-100 bg-violet-50"
          }`}
          
        />
        {errors.title && <p className="text-red-500 text-xs">{errors.title}</p>}
      </div>

      {/* Company Name */}
      <div>
        <label htmlFor="company_name" className="block text-sm font-semibold text-violet-700">Company Name</label>
        <input
          type="text"
          id="company_name"
          name="company_name"
          value={formData.company_name}
          onChange={handleInputChange}
          className="w-full p-3 rounded-md border border-violet-100 bg-violet-50 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
        />
      </div>

      {/* Contact Type */}
      <div>
        <label htmlFor="contact_type" className="block text-sm font-semibold text-violet-700">Contact Type</label>
        <select
          id="contact_type"
          name="contact_type"
          value={formData.contact_type}
          onChange={handleInputChange}
          className={`w-full p-3 rounded-md border focus:outline-none transition ${
            errors.contact_type ? "bg-red-100 border-red-500" : "border-violet-100 bg-violet-50"
          }`}
          
        >
          <option value="customer">Customer</option>
          <option value="prospect">Prospect</option>
          <option value="lead">Lead</option>
        </select>
        {errors.contact_type && <p className="text-red-500 text-xs">{errors.contact_type}</p>}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-violet-700">Email</label>
        <input
          type="text"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className={`w-full p-3 rounded-md border focus:outline-none transition ${
            errors.email ? "bg-red-100 border-red-500" : "border-violet-100 bg-violet-50"
          }`}
          
        />
        {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
      </div>

      {/* Contact Number */}
      <div>
        <label htmlFor="contact_number" className="block text-sm font-semibold text-violet-700">Phone Number</label>
        <input
          type="text"
          id="contact_number"
          name="contact_number"
          value={formatPhoneNumber(formData.contact_number)}
          onChange={(e) => handleInputChange({ target: { name: "contact_number", value: e.target.value } })}
          className={`w-full p-3 rounded-md border focus:outline-none transition ${
            errors.contact_number ? "bg-red-100 border-red-500" : "border-violet-100 bg-violet-50"
          }`}
          
        />
        {errors.contact_number && <p className="text-red-500 text-xs">{errors.contact_number}</p>}
      </div>

      <div>
        <label htmlFor="owner" className="block text-sm font-semibold text-violet-700">
          Change Owner
        </label>
        {loading ? (
          <select
            id="owner"
            name="owner"
            disabled
            className="w-full p-3 rounded-md border border-violet-100 bg-violet-50 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
          >
            <option value="">Loading...</option>
          </select>
        ) : (
          <select
            id="owner"
            name="owner"
            value={formData.owner}
            onChange={handleInputChange}
            className="w-full p-3 rounded-md border border-violet-100 bg-violet-50 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
          >
            {userOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}
        {errors.owner && <p className="text-red-500 text-xs">{errors.owner}</p>}
      </div>

       <div className="flex justify-end">
        <button onClick={onClose} className="bg-gray-600 mx-4 hover:bg-gray-800 text-white px-3 py-2 w-48 rounded-md">Close</button>
        <button type="submit" disabled={loading} className="bg-violet-600
        hover:bg-violet-900 text-white px-3 py-2 w-64 rounded-md flex flex-row justify-center align-middle disabled:bg-violet-200 disabled:text-gray-500"> 
             {localLoading ? (
                        <><LoaderCircle className="mr-2 h-6 w-6 animate-spin" />
                            Please wait</>
                    ) : (
                        <>Save Changes</>
                    )}
        </button>
      </div>
    </form>
  );

  return content;
};


export default EditContactForm;