import Timeline from '@/components/Timeline';
import TeamInfo from '@/components/TeamInfo';

const Roadmap = () => {
  return (
    <div className="min-h-screen bg-gradient-glow">
      <main className="container mx-auto px-6 py-12 space-y-12">
        <Timeline />
        <TeamInfo />
      </main>
    </div>
  );
};

export default Roadmap;
