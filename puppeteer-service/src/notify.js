const fetch = require("node-fetch");

const API_ENDPOINT = `http://${process.env.API_SERVICE_HOST}/v1/graphql`;

const MUTATION_UPDATE_THUMBNAIL = `
  mutation UpdateThumbnail($id: Int!, $thumbnail: String!) {
    update_Bookmarks_by_pk(
      pk_columns: { id: $id },
      _set: { thumbnail: $thumbnail }
    ) {
      id
    }
  }
`;

const notify = async (id, thumbnail) => {
  const response = await fetch(API_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: MUTATION_UPDATE_THUMBNAIL,
      variables: { id, thumbnail },
    }),
  });

  return { 
    status: response.status,
    statusText: response.statusText,
    body: await response.text()
  }
};

module.exports = notify;