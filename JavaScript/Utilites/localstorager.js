const localStorager = {

   get_item: (value_name) => {
      if (localStorage.getItem(value_name) === null) return undefined;
      const userString = localStorage.getItem(value_name);
      return JSON.parse(userString);
   },
   set_item: (value_name, value) => {
      return localStorage.setItem(value_name, JSON.stringify(value));
   },
   remove_item: (value_name) => {
      return localStorage.removeItem(value_name);
   },
   reset: () => {
      localStorage.clear();
   }
}