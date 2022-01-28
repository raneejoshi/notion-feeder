import getNewFeedItems from './feed';
import {
  addFeedItemToNotion,
  deleteOldUnreadFeedItemsFromNotion,
} from './notion';
import htmlToNotionBlocks from './parser';

async function index() {
  const feedItems = await getNewFeedItems();

  for (let i = 0; i < feedItems.length; i++) {
    const item = feedItems[i];
    const notionItem = {
      title: item.Name,
      link: item.URL,
      content: htmlToNotionBlocks(item.content),
    };
    await addFeedItemToNotion(notionItem);
  }

  await deleteOldUnreadFeedItemsFromNotion();
}

index();
