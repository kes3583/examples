// state
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
          // 보통 첫번째 레터가 대문자인 경우는 쿼리문 조합해서 만든?
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
  imagePaths: [], // 업로드 이미지경로
  addPostLoading: false, // 포스트 로딩창
  addPostDone: false,
  addPostError: null,
  addCommentLoading: false, // 코멘트 로딩창
  addCommentDone: false,
  addCommentError: null,
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

// 비동기 형식은 세개 한 묶음 Request, success, failed or rejected
// 동적 액션 크리에이터 : 액션을 그때그때 생성해주는 것.
export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';

export function addPost(data) {
  return {
    type: ADD_POST_REQUEST,
    data,
  };
}

export function addComment(data) {
  return {
    type: ADD_COMMENT_REQUEST,
    data,
  };
}

// reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST_REQUEST:
      return {
        ...state,
        addPostLoading: true,
        addPostError: null,
      };
    case ADD_POST_SUCCESS: {
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        addPostLoading: false,
        addPostDone: true,
      };
    }
    case ADD_POST_FAILURE:
      return {
        ...state,
        addPostLoading: false,
        addPostError: action.error,
      };
    case ADD_COMMENT_REQUEST:
      return {
        ...state,
        addCommentLoading: true,
        addCommentError: null, // false라고 해도 된다. falsy이기 때문
      };
    case ADD_COMMENT_SUCCESS: {
      return {
        ...state,
        // mainPosts: [...state.mainPosts, Comments: [...state.mainPosts.Comments, dummyComment]],
        addCommentLoading: false,
        addCommentDone: true,
      };
    }
    case ADD_COMMENT_FAILURE:
      return {
        ...state,
        addCommentLoading: false,
        addCommentError: action.error,
      };
    default:
      return state;
  }
};

export default reducer;
