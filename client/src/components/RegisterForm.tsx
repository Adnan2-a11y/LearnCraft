import React, { useState } from 'react';
import { authApi, RegisterCredentials } from '../api/auth';

export const RegisterForm: React.FC = () => {
    const [formData, setFormData] = useState<RegisterCredentials>({
        role: 'student', // Hardcoded as requested
        username: '',
        email: '',
        password: '',
        fullName: '',
        studentId: '',
        department: '',
        batch: '',
        phone: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            await authApi.register(formData);
            setSuccess(true);
            setFormData({
                role: 'student',
                username: '',
                email: '',
                password: '',
                fullName: '',
                studentId: '',
                department: '',
                batch: '',
                phone: ''
            });
        } catch (err: any) {
            // Handle potential array of validation errors from backend
            if (err.errors && Array.isArray(err.errors)) {
                setError(err.errors.map((e: any) => e.msg).join(', '));
            } else {
                setError(err.message || 'Failed to register. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="bg-green-50 p-6 rounded-lg shadow-md text-center">
                <h3 className="text-2xl font-bold text-green-600 mb-4">Registration Successful!</h3>
                <p className="text-gray-700 mb-6">You have successfully registered as a student. You can now log in.</p>
                <button 
                    onClick={() => setSuccess(false)}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
                >
                    Register another student
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Student Registration</h2>
            
            {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 border border-red-400 rounded">
                    {error}
                </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Personal Info */}
                <div className="col-span-1 md:col-span-2">
                    <h3 className="text-lg font-semibold text-gray-700 mb-3 border-b pb-1">Personal Information</h3>
                </div>

                <div className="mb-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullName">
                        Full Name *
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                        id="fullName"
                        name="fullName"
                        type="text"
                        placeholder="John Doe"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                        Phone (+880...)
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+8801xxxxxxxxx"
                        value={formData.phone}
                        onChange={handleChange}
                        pattern="^(\+8801[3-9]\d{8})?$"
                        title="Must be a valid Bangladeshi number starting with +880"
                    />
                </div>

                {/* Academic Info */}
                <div className="col-span-1 md:col-span-2 mt-4">
                    <h3 className="text-lg font-semibold text-gray-700 mb-3 border-b pb-1">Academic Information</h3>
                </div>

                <div className="mb-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="studentId">
                        Student ID *
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                        id="studentId"
                        name="studentId"
                        type="text"
                        value={formData.studentId}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="department">
                        Department
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                        id="department"
                        name="department"
                        type="text"
                        placeholder="CSE"
                        value={formData.department}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="batch">
                        Batch
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                        id="batch"
                        name="batch"
                        type="text"
                        placeholder="25th"
                        value={formData.batch}
                        onChange={handleChange}
                    />
                </div>

                 {/* Account Info */}
                 <div className="col-span-1 md:col-span-2 mt-4">
                    <h3 className="text-lg font-semibold text-gray-700 mb-3 border-b pb-1">Account Details</h3>
                </div>

                <div className="mb-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Username *
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                        id="username"
                        name="username"
                        type="text"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        minLength={3}
                    />
                </div>

                <div className="mb-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email Address *
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-2 col-span-1 md:col-span-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password *
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        minLength={6}
                        placeholder="Min 6 chars, uppercase, lowercase, number, special char"
                    />
                    <p className="text-xs text-gray-500">Must contain uppercase, lowercase, number, and special character.</p>
                </div>
            </div>

            <div className="mt-6">
                <button 
                    type="submit" 
                    disabled={loading}
                    className={`w-full font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-opacity ${
                        loading 
                        ? 'bg-blue-400 cursor-not-allowed' 
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                >
                    {loading ? 'Registering...' : 'Register Account'}
                </button>
            </div>
        </form>
    );
};
