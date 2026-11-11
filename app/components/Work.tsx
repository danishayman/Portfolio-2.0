import WorkTabs from './WorkTabs';
import { imageAlt, workExperienceData } from '../work/workData';

// Preview photos per job (static imports give each image its size and a blur placeholder)
import gsc1 from '../../public/gsc/gsc1.webp';
import gsc2 from '../../public/gsc/gsc2.webp';
import teenfix1 from '../../public/teenfix/teenfix1.webp';
import teenfix2 from '../../public/teenfix/teenfix2.webp';
import daboss1 from '../../public/daboss/daboss1.webp';
import daboss2 from '../../public/daboss/daboss2.webp';
import inari7 from '../../public/inari/inari7.jpg';
import inari3 from '../../public/inari/inari3.jpg';

// Each preview carries the public path of the same photo, so its description comes from workData
const previewImages = {
    'inari-amertron-berhad': [
        { photo: inari3, alt: imageAlt['/inari/inari3.jpg'] },
        { photo: inari7, alt: imageAlt['/inari/inari7.jpg'] },
    ],
    'pc-daboss': [
        { photo: daboss1, alt: imageAlt['/daboss/daboss1.webp'] },
        { photo: daboss2, alt: imageAlt['/daboss/daboss2.webp'] },
    ],
    'gsc': [
        { photo: gsc1, alt: imageAlt['/gsc/gsc1.webp'] },
        { photo: gsc2, alt: imageAlt['/gsc/gsc2.webp'] },
    ],
    'teenfix-studio': [
        { photo: teenfix1, alt: imageAlt['/teenfix/teenfix1.webp'] },
        { photo: teenfix2, alt: imageAlt['/teenfix/teenfix2.webp'] },
    ],
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
