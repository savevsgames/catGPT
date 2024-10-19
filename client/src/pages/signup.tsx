import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup: React.FC = () => {
    
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        email: '',
        password: '',
        confirmPass: '',
        bio: '',
    });
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({
            ...form, [e.target.name]: e.target.value,
        })
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (form.password !== form.confirmPass) {
            alert('Password does not match, please try again.');
            return;
        }

        setError(null);
        setLoading(true);

        try {
            const response = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form),
            });

            if (!response.ok) {
                throw new Error('Unable to signup... please try again.');
            }

            navigate('/login')
        } catch (err: any) {
            setError(err.message || 'An error ocurred, please try again.');
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div className='bg-gray-400 p-4 min-h-screen flex flex-col items-center rounded-bl rounded-br'>
            <h1 className='text-3xl mb-6'>Sign Up</h1>
            <form onSubmit={handleSubmit} className='w-full max-w-md flex flex-col space-y-4'>
                <div>
                    <label className='block text-lg mb-2'>Email</label>
                    <input
                        type='email'
                        name='email'
                        value={form.email}
                        onChange={handleChange}
                        required
                        className='w-full p-2 border border-gray-300 rounded'
                    />
                </div>
                <div>
                    <label className='block text-lg mb-2'>Password</label>
                    <input
                        type='password'
                        name='password'
                        value={form.password}
                        onChange={handleChange}
                        required
                        className='w-full p-2 border boder-gray-300 rounded'
                    />
                </div>
                <div>
                    <label className='block text-lg mb-2'>Confirm Password</label>
                    <input
                        type='password'
                        name='confirmPass'
                        value={form.confirmPass}
                        onChange={handleChange}
                        required
                        className='w-full p-2 border border-gray-300 rounded'
                    />
                </div>
                <div>
                    <label className='block text-lg mb-2'>Bio (200 characters max)</label>
                    <textarea
                        name='bio'
                        value={form.bio}
                        onChange={handleChange}
                        maxLength={200}
                        className='w-full p-2 border border-gray-300 rounded'
                    />
                </div>
                {error && <p className='text-white'>{error}</p>}
                <button
                    type='submit'
                    className={`bg-yellow-500 p-3 rounded ${loading? 'opacity-50' : ''}`}
                    disabled={loading}
                >
                    {loading ? 'Submitting...' : 'Adopt'}
                </button>
            </form>
        </div>
    );
};

export default Signup;