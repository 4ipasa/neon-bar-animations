import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Phone, Mail, Send } from 'lucide-react';
import { useRevealAnimation, GradientText, NeonGlow } from './Animations';
import { useLanguage } from '../context/LanguageContext';

const DEFAULT_CONTACT_INFO = {
  address: "123 Nightlife Street, Downtown",
  phone: "+1 (555) 123-4567",
  email: "reservations@neonbar.com",
  hours: {
    monday: { isOpen: false, start: "18:00", end: "01:00" },
    tuesday: { isOpen: true, start: "18:00", end: "01:00" },
    wednesday: { isOpen: true, start: "18:00", end: "01:00" },
    thursday: { isOpen: true, start: "18:00", end: "01:00" },
    friday: { isOpen: true, start: "18:00", end: "03:00" },
    saturday: { isOpen: true, start: "18:00", end: "03:00" },
    sunday: { isOpen: true, start: "18:00", end: "00:00" }
  }
};

const ContactSection: React.FC = () => {
  const { addToRefs } = useRevealAnimation();
  const { t } = useLanguage();
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    date: '',
    time: '',
    guests: '2',
    message: '',
  });
  
  const [contactInfo, setContactInfo] = useState(DEFAULT_CONTACT_INFO);

  useEffect(() => {
    try {
      // Load contact settings from localStorage if available
      const storedContactContent = localStorage.getItem('contactContent');
      if (storedContactContent) {
        const parsedContent = JSON.parse(storedContactContent);
        // Ensure all required properties exist by merging with defaults
        setContactInfo({
          ...DEFAULT_CONTACT_INFO,
          ...parsedContent,
          hours: {
            ...DEFAULT_CONTACT_INFO.hours,
            ...(parsedContent.hours || {})
          }
        });
      }
    } catch (error) {
      console.error("Error loading stored contact content:", error);
      // Keep default values in case of error
    }
  }, []);

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

  // Format opening hours for display
  const formatOpeningHours = () => {
    const days = [
      { key: 'monday', label: t('monday') },
      { key: 'tuesday', label: t('tuesday') },
      { key: 'wednesday', label: t('wednesday') },
      { key: 'thursday', label: t('thursday') },
      { key: 'friday', label: t('friday') },
      { key: 'saturday', label: t('saturday') },
      { key: 'sunday', label: t('sunday') }
    ];
    
    // Group days with the same hours
    const groupedHours: Record<string, string[]> = {};
    
    days.forEach(day => {
      const dayKey = day.key as keyof typeof contactInfo.hours;
      const dayInfo = contactInfo.hours[dayKey];
      
      if (!dayInfo.isOpen) {
        const key = `${t('closed')}`;
        groupedHours[key] = groupedHours[key] || [];
        groupedHours[key].push(day.label);
      } else {
        const key = `${dayInfo.start} - ${dayInfo.end}`;
        groupedHours[key] = groupedHours[key] || [];
        groupedHours[key].push(day.label);
      }
    });
    
    // Format the grouped hours for display
    return Object.entries(groupedHours).map(([hours, daysList], index) => {
      // Helper function to format day ranges
      const formatDayRange = (days: string[]) => {
        if (days.length === 1) return days[0];
        if (days.length === 2) return `${days[0]} & ${days[1]}`;
        
        // Find consecutive days
        const ranges: string[] = [];
        let rangeStart = 0;
        
        for (let i = 1; i <= days.length; i++) {
          if (i === days.length || days[i] !== days[i-1]) {
            if (i - rangeStart > 2) {
              ranges.push(`${days[rangeStart]} - ${days[i-1]}`);
            } else {
              for (let j = rangeStart; j < i; j++) {
                ranges.push(days[j]);
              }
            }
            rangeStart = i;
          }
        }
        
        return ranges.join(', ');
      };
      
      return `${formatDayRange(daysList)}: ${hours}`;
    }).join('\n');
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
            <p className="text-white/60 uppercase tracking-wider mb-3">{t('get_in_touch')}</p>
          </div>
          <div ref={(el) => addToRefs(el as HTMLElement)}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <GradientText>{t('reserve_your_experience').split(' ')[0]}</GradientText> {t('reserve_your_experience').split(' ').slice(1).join(' ')}
            </h2>
          </div>
          <div ref={(el) => addToRefs(el as HTMLElement)}>
            <p className="max-w-2xl mx-auto text-white/70 text-lg">
              {t('book_table_message')}
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 md:gap-16">
          {/* Contact Info */}
          <div className="lg:col-span-2">
            <div ref={(el) => addToRefs(el as HTMLElement)} className="glass-card p-8 h-full">
              <h3 className="text-2xl font-semibold mb-6">{t('visit_us')}</h3>
              
              {/* Contact Items */}
              <div className="space-y-6 mb-8">
                {[
                  { icon: <MapPin size={20} className="text-neon-blue" />, title: t('address'), content: contactInfo.address },
                  { icon: <Clock size={20} className="text-neon-purple" />, title: t('opening_hours'), content: formatOpeningHours() },
                  { icon: <Phone size={20} className="text-neon-pink" />, title: t('phone'), content: contactInfo.phone },
                  { icon: <Mail size={20} className="text-neon-blue" />, title: t('email'), content: contactInfo.email }
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
                <h4 className="text-white text-sm font-medium mb-3">{t('follow_us')}</h4>
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
              <h3 className="text-2xl font-semibold mb-6">{t('make_reservation')}</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Form fields */}
                  <div>
                    <label htmlFor="name" className="block text-white/80 text-sm mb-2">
                      {t('name')}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-bar-light/50 border border-white/10 rounded-md text-white focus:outline-none focus:border-neon-blue/50 transition-colors"
                      placeholder={t('your_name')}
                    />
                  </div>
                  
                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-white/80 text-sm mb-2">
                      {t('email')}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-bar-light/50 border border-white/10 rounded-md text-white focus:outline-none focus:border-neon-blue/50 transition-colors"
                      placeholder={t('your_email')}
                    />
                  </div>
                  
                  {/* Date */}
                  <div>
                    <label htmlFor="date" className="block text-white/80 text-sm mb-2">
                      {t('date')}
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
                      {t('time')}
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
                      {t('number_of_guests')}
                    </label>
                    <select
                      id="guests"
                      name="guests"
                      value={formState.guests}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-bar-light/50 border border-white/10 rounded-md text-white focus:outline-none focus:border-neon-blue/50 transition-colors"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                        <option key={num} value={num}>{num} {num === 1 ? t('person') : t('people')}</option>
                      ))}
                      <option value="9+">9+ {t('people')}</option>
                    </select>
                  </div>
                  
                  {/* Special Request */}
                  <div className="md:col-span-2">
                    <label htmlFor="message" className="block text-white/80 text-sm mb-2">
                      {t('special_request')}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 bg-bar-light/50 border border-white/10 rounded-md text-white focus:outline-none focus:border-neon-blue/50 transition-colors"
                      placeholder={t('any_special_requests')}
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
                      <span className="mr-2">{t('reserve_now')}</span>
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

