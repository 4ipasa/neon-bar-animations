
import React, { useState } from 'react';
import { MapPin, Clock, Phone, Mail, Send } from 'lucide-react';
import { useRevealAnimation, GradientText, NeonGlow } from './Animations';

const ContactSection: React.FC = () => {
  const { addToRefs } = useRevealAnimation();
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    date: '',
    time: '',
    guests: '2',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would normally handle the form submission
    console.log('Form submitted:', formState);
    alert('Reservation request submitted!');
    setFormState({
      name: '',
      email: '',
      date: '',
      time: '',
      guests: '2',
      message: '',
    });
  };

  return (
    <section id="contact" className="section-padding bg-bar-black relative">
      {/* Background Effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-br from-neon-blue/5 via-neon-purple/5 to-neon-pink/5 rounded-full blur-3xl opacity-30"></div>
      </div>
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div ref={(el) => addToRefs(el as HTMLElement)}>
            <p className="text-white/60 uppercase tracking-wider mb-3">Get in touch</p>
          </div>
          <div ref={(el) => addToRefs(el as HTMLElement)}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <GradientText>Reserve</GradientText> Your Experience
            </h2>
          </div>
          <div ref={(el) => addToRefs(el as HTMLElement)}>
            <p className="max-w-2xl mx-auto text-white/70 text-lg">
              Book your table or private event with us and enjoy a memorable evening of exceptional cocktails and ambiance.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 md:gap-16">
          {/* Contact Info */}
          <div className="lg:col-span-2">
            <div ref={(el) => addToRefs(el as HTMLElement)} className="glass-card p-8 h-full">
              <h3 className="text-2xl font-semibold mb-6">Visit Us</h3>
              
              {/* Contact Items */}
              <div className="space-y-6 mb-8">
                {[
                  { icon: <MapPin size={20} className="text-neon-blue" />, title: "Address", content: "123 Nightlife Street, Downtown, New York, NY 10001" },
                  { icon: <Clock size={20} className="text-neon-purple" />, title: "Opening Hours", content: "Tue-Thu: 6PM - 1AM\nFri-Sat: 6PM - 3AM\nSun: 6PM - 12AM" },
                  { icon: <Phone size={20} className="text-neon-pink" />, title: "Phone", content: "+1 (555) 123-4567" },
                  { icon: <Mail size={20} className="text-neon-blue" />, title: "Email", content: "reservations@neonbar.com" }
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="mr-4 mt-1">{item.icon}</div>
                    <div>
                      <h4 className="text-white text-sm font-medium mb-1">{item.title}</h4>
                      <p className="text-white/70 text-sm whitespace-pre-line">{item.content}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Social Media */}
              <div>
                <h4 className="text-white text-sm font-medium mb-3">Follow Us</h4>
                <div className="flex space-x-4">
                  {['instagram', 'facebook', 'twitter'].map((social, index) => (
                    <a
                      key={index}
                      href={`https://${social}.com`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-bar-light flex items-center justify-center hover:bg-white/10 transition-colors duration-300"
                    >
                      <img
                        src={`https://cdn.simpleicons.org/${social}/ffffff`}
                        alt={social}
                        className="w-5 h-5"
                      />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Map & Form */}
          <div className="lg:col-span-3 space-y-8">
            {/* Map */}
            <div ref={(el) => addToRefs(el as HTMLElement)} className="h-64 rounded-lg overflow-hidden relative">
              <iframe
                title="Neon Bar Location"
                className="w-full h-full border-0"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d96708.34194156103!2d-74.03927096776363!3d40.759040371592!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2588f046ee661%3A0xa0b3281fcecc08c!2sManhattan%2C%20New%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1635781458011!5m2!1sen!2sus"
                allowFullScreen
                loading="lazy"
              ></iframe>
              <div className="absolute inset-0 pointer-events-none border border-white/10 rounded-lg"></div>
            </div>
            
            {/* Reservation Form */}
            <div ref={(el) => addToRefs(el as HTMLElement)} className="glass-card p-8">
              <h3 className="text-2xl font-semibold mb-6">Make a Reservation</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-white/80 text-sm mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-bar-light/50 border border-white/10 rounded-md text-white focus:outline-none focus:border-neon-blue/50 transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  
                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-white/80 text-sm mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-bar-light/50 border border-white/10 rounded-md text-white focus:outline-none focus:border-neon-blue/50 transition-colors"
                      placeholder="Your email"
                    />
                  </div>
                  
                  {/* Date */}
                  <div>
                    <label htmlFor="date" className="block text-white/80 text-sm mb-2">
                      Date
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formState.date}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-bar-light/50 border border-white/10 rounded-md text-white focus:outline-none focus:border-neon-blue/50 transition-colors"
                    />
                  </div>
                  
                  {/* Time */}
                  <div>
                    <label htmlFor="time" className="block text-white/80 text-sm mb-2">
                      Time
                    </label>
                    <input
                      type="time"
                      id="time"
                      name="time"
                      value={formState.time}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-bar-light/50 border border-white/10 rounded-md text-white focus:outline-none focus:border-neon-blue/50 transition-colors"
                    />
                  </div>
                  
                  {/* Guests */}
                  <div>
                    <label htmlFor="guests" className="block text-white/80 text-sm mb-2">
                      Number of Guests
                    </label>
                    <select
                      id="guests"
                      name="guests"
                      value={formState.guests}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-bar-light/50 border border-white/10 rounded-md text-white focus:outline-none focus:border-neon-blue/50 transition-colors"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                        <option key={num} value={num}>{num} {num === 1 ? 'person' : 'people'}</option>
                      ))}
                      <option value="9+">9+ people</option>
                    </select>
                  </div>
                  
                  {/* Special Request */}
                  <div className="md:col-span-2">
                    <label htmlFor="message" className="block text-white/80 text-sm mb-2">
                      Special Request (Optional)
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 bg-bar-light/50 border border-white/10 rounded-md text-white focus:outline-none focus:border-neon-blue/50 transition-colors"
                      placeholder="Any special requests?"
                    ></textarea>
                  </div>
                </div>
                
                {/* Submit Button */}
                <div>
                  <NeonGlow color="blue">
                    <button
                      type="submit"
                      className="w-full px-6 py-3 bg-bar-black border border-neon-blue/30 rounded-md text-white hover:bg-neon-blue/10 transition-all duration-300 flex items-center justify-center"
                    >
                      <span className="mr-2">Reserve Now</span>
                      <Send size={18} />
                    </button>
                  </NeonGlow>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
