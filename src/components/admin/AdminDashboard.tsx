
import React from 'react';
import { BarChart, Users, Coffee, Settings } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from '../../context/LanguageContext';

const AdminDashboard: React.FC = () => {
  const { t } = useLanguage();
  
  // Sample data for the dashboard
  const dashboardStats = [
    { 
      title: t('total_visitors'),
      value: '1,248',
      icon: <Users className="text-neon-blue" size={24} />,
      change: '+12%'
    },
    { 
      title: t('cocktails_ordered'),
      value: '327',
      icon: <Coffee className="text-neon-purple" size={24} />,
      change: '+18%'
    },
    { 
      title: t('menu_items'),
      value: '7',
      icon: <BarChart className="text-neon-blue" size={24} />,
      change: '+2'
    },
    { 
      title: t('system_status'),
      value: t('online'),
      icon: <Settings className="text-green-500" size={24} />,
      change: '100%'
    }
  ];
  
  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <h2 className="text-xl font-bold mb-6">{t('dashboard_overview')}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {dashboardStats.map((stat, index) => (
            <Card key={index} className="bg-bar-dark border-white/10 text-white">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-white/70">
                  {stat.title}
                </CardTitle>
                {stat.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <p className="text-xs text-white/60">
                  <span className={`inline-block mr-1 ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                    {stat.change}
                  </span>
                  {t('from_last_month')}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      <div className="glass-card p-6">
        <h2 className="text-xl font-bold mb-4">{t('latest_activity')}</h2>
        
        <div className="border border-white/10 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-bar-light">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-white/60">{t('time')}</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-white/60">{t('activity')}</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-white/60">{t('user')}</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { time: "14:32", activity: t('cocktail_added'), user: "Admin" },
                  { time: "11:15", activity: t('menu_updated'), user: "Admin" },
                  { time: "09:48", activity: t('site_content_edited'), user: "Admin" }
                ].map((item, index) => (
                  <tr key={index} className="border-b border-white/5 hover:bg-white/5">
                    <td className="px-4 py-3 text-sm">{item.time}</td>
                    <td className="px-4 py-3 text-sm">{item.activity}</td>
                    <td className="px-4 py-3 text-sm">{item.user}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
