//state
export const initialState = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: 'kes3583@naver.com',
        nickname: 'cherry',
      },
      content:
        '#cat #반려동물 ###quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto',
      Images: [
        {
          //보통 첫번째 레터가 대문자인 경우는 쿼리문 조합해서 만든?
          url: 'https://via.placeholder.com/600/92c952',
          thumbnailUrl: 'https://via.placeholder.com/150/92c952',
        },
        {
          url: 'https://via.placeholder.com/600/771796',
          thumbnailUrl: 'https://via.placeholder.com/150/771796',
        },
        {
          url: 'https://via.placeholder.com/600/24f355',
          thumbnailUrl: 'https://via.placeholder.com/150/24f355',
        },
      ],
      Comments: [
        {
          User: {
            nickname: 'april',
          },
          body:
            'laudantium enim quasi est quidem magnam voluptate ipsam eos tempora quo necessitatibus dolor quam autem quasi reiciendis et nam sapiente accusantium',
        },
        {
          User: {
            nickname: 'blossom',
          },
          body:
            'non et atque occaecati deserunt quas accusantium unde odit nobis qui voluptatem quia voluptas consequuntur itaque dolor et qui rerum deleniti ut occaecat',
        },
      ],
    },
  ],
  imagePaths: [], //업로드 이미지경로
  postAdded: false, // 포스트 업로드 여부
};

const dummyPost = {
  id: 2,
  content: 'dummy',
  User: {
    id: 1,
    nickname: 'youtube',
  },
  Images: [],
  Comments: [],
};

const ADD_POST = 'ADD_POST';
export function addPost(data) {
  return {
    type: ADD_POST,
    data,
  };
}

//reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST: {
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        postAdded: true,
      };
    }
    default:
      return state;
  }
};

export default reducer;
