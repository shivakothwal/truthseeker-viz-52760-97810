import { Mail, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TeamInfo = () => {
  const teamMembers = [
    {
      role: 'ML Engineer',
      responsibilities: 'Data Preparation & Model Development',
    },
    {
      role: 'Backend Engineer',
      responsibilities: 'API Development & Deployment',
    },
    {
      role: 'Frontend Designer',
      responsibilities: 'UI/UX Design & Implementation',
    },
    {
      role: 'Documentation/Presenter',
      responsibilities: 'Documentation & Presentation',
    },
  ];

  return (
    <Card className="w-full max-w-5xl mx-auto shadow-[0_0_40px_hsl(190_100%_50%_/_0.3)] border-2 border-primary/40 bg-card animate-fade-in mt-12">
      <CardHeader className="bg-primary/10 border-b-4 border-primary/40">
        <CardTitle className="flex items-center gap-3 text-2xl uppercase tracking-wider">
          <Users className="h-8 w-8 text-primary drop-shadow-[0_0_8px_hsl(190_100%_50%_/_0.6)]" />
          Team CODE REVIEW
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        {/* Team Structure */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {teamMembers.map((member, idx) => (
            <div
              key={idx}
              className="p-4 bg-card rounded-lg border-2 border-primary/30 hover:border-primary hover:shadow-[0_0_20px_hsl(190_100%_50%_/_0.3)] transition-all"
            >
              <h3 className="font-bold text-lg text-primary mb-1 uppercase tracking-wide">{member.role}</h3>
              <p className="text-sm text-muted-foreground font-mono">{member.responsibilities}</p>
            </div>
          ))}
        </div>

        {/* Contact Information */}
        <div className="pt-4 border-t-2 border-primary/30">
          <div className="flex items-center gap-2 text-foreground">
            <Mail className="h-5 w-5 text-primary" />
            <span className="font-semibold uppercase tracking-wider text-primary text-sm">Contact:</span>
            <a
              href="mailto:vDevasmitha526@gmslo.com"
              className="text-foreground hover:text-primary transition-colors underline font-mono"
            >
              vDevasmitha526@gmslo.com
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamInfo;
