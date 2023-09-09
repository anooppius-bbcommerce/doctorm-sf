const config = {
    sanity: {
      projectId: process.env.NEXT_SANITY_STUDIO_API_PROJECT_ID || 'lsciif36',
      dataset: process.env.NEXT_SANITY_STUDIO_API_DATASET || 'production',
      apiVersion: process.env.NEXT_SANITY_STUDIO_API_VERSION || '2021-06-07',
      token: process.env.NEXT_SANITY_STUDIO_API_READ_TOKEN || 'skLeItChoOctyWwqWOuFb3YGEzGeuKKBipXBycgQb8zN5XTjxJrSYrSp0D8E2xGJ36Z4oXpqwRuTHASzchMRnNiasgqp2EOqUQSxNnYtOwNKSV9tYQLEJqSx8I53i6APwqvbtUeqKpUbQcOjDMuQAAFhd99dQdcmZRav7K97RzGFfFza3mJx',
    },
    algoliaIndexName: process.env.NEXT_ALGOLIA_INDEX_NAME || 'test.mobile-app.AED.products',
    algoliaProjectId: process.env.NEXT_ALGOLIA_PROJECT_ID || 'YXKWT0FKQM',
    algoliaReadKey: process.env.NEXT_ALGOLIA_READ_KEY || '11d7ffaf5f69d91c4b7945038aeaef79',
  };
  export default config;
