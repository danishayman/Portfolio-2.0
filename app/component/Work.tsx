import WorkTabs from './WorkTabs';
import { workExperienceData } from '../work/workData';

// Preview photos per job (static imports give each image its size and a blur placeholder)
import gsc1 from '../../public/gsc/gsc1.webp';
import gsc2 from '../../public/gsc/gsc2.webp';
import teenfix1 from '../../public/teenfix/teenfix1.webp';
import teenfix2 from '../../public/teenfix/teenfix2.webp';
import daboss1 from '../../public/daboss/daboss1.webp';
import daboss2 from '../../public/daboss/daboss2.webp';
import inari7 from '../../public/inari/inari7.jpg';
import inari3 from '../../public/inari/inari3.jpg';

const previewImages = {
    'inari-amertron-berhad': [inari3, inari7],
    'pc-daboss': [daboss1, daboss2],
    'gsc': [gsc1, gsc2],
    'teenfix-studio': [teenfix1, teenfix2],
};

// Server wrapper: only the fields the tabs show are sent to the client, not the long detail-page stories
export default function Work() {
    const workExperience = workExperienceData.map(({ role, company, duration, description, slug }) => ({
        role,
        company,
        duration,
        description,
        slug,
        images: previewImages[slug as keyof typeof previewImages] ?? [],
    }));

    return <WorkTabs workExperience={workExperience} />;
}
