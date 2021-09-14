export const initialState = {
  menuOpen: false,
  events: null,
  user: null,
  redirect: null,
};

export function reducer(state, action) {
  switch (action.type) {
    case 'toggleMenu':
      return { ...state, menuOpen: !state.menuOpen };
    case 'setEvents': {
      const events = action.value;
      window.localStorage.setItem('events', JSON.stringify(events));
      return { ...state, events };
    }
    case 'setUser': {
      const user = action.value;
      window.localStorage.setItem('user', JSON.stringify(user));
      return { ...state, user };
    }
    case 'setRedirect': {
      const redirect = action.value;
      window.localStorage.setItem('redirect', JSON.stringify(redirect));
      return { ...state, redirect };
    }
    default:
      throw new Error();
  }
}
