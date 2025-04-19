import { ZingMp3 } from 'zingmp3-api-full';
import { db } from './firebaseConfig.js';
import { collection, doc, setDoc } from 'firebase/firestore';



const debugHomeSections = async () => {
  const res = await ZingMp3.getHome();
  const sections = res.data.items;

  sections.forEach((section, index) => {
    console.log(`🔹 Section ${index + 1}:`);
    console.log(`   • Title: ${section.title}`);
    console.log(`   • Type: ${section.sectionType}`);
    console.log(`   • Items count: ${section.items?.length || 0}`);

    // In 3 bài hát đầu tiên nếu có
    if (section.items && Array.isArray(section.items)) {
      section.items.slice(0, 3).forEach((item, idx) => {
        console.log(`     🎵 [${idx + 1}] ${item.title} - ${item.artistsNames}`);
      });
    }

    console.log('--------------------------');
  });
};

debugHomeSections();



