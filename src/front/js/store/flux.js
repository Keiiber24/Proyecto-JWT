const getState = ({ getStore, getActions, setStore }) => {
	return {
	  store: {
		message: null,
		demo: [
		  {
			title: "FIRST",
			background: "white",
			initial: "white",
		  },
		  {
			title: "SECOND",
			background: "white",
			initial: "white",
		  },
		],
	  },
	  actions: {
		// Use getActions to call a function within a fuction
		exampleFunction: () => {
		  getActions().changeColor(0, "green");
		},
		signUp: async (requestBody) => {
		  const response = await fetch(`${process.env.BACKEND_URL}/api/users`, {
			method: "POST",
			body: JSON.stringify(requestBody),
			headers: {
			  "Content-Type": "application/json",
			},
		  });
		  return response.status === 201;
		},
  
		login: async (requestBody) => {
		  try {
			const response = await fetch(`${process.env.BACKEND_URL}/api/token`, {
			  method: "POST",
			  body: JSON.stringify(requestBody),
			  headers: {
				"Content-Type": "application/json",
			  },
			});
  
			if (response.status !== 200) {
			  throw "Invalid credentials";
			}
			const data = await response.json();
			localStorage.setItem("jwt-token", data.token);
  
			return data;
		  } catch (error) {
			console.log(error);
			return false;
		  }
		},
  
		private: async () => {
		  try {
			const token = localStorage.getItem("jwt-token");
			const response = await fetch(
			  `${process.env.BACKEND_URL}/api/private`,
			  {
				method: "GET",
				headers: {
				  "Content-Type": "application/json",
				  Authorization: `Bearer ${token}`,
				},
			  }
			);
			if (!response.ok)
			  throw Error("hubo un problema con el login request");
			var data = await response.json();
			console.log("This is the data yo requested", data);
			setStore({
			  private: data,
			});
			return data;
		  } catch (error) {
			console.log(error);
			return false;
		  }
		},
  
		getMessage: async () => {
		  try {
			// fetching data from the backend
			const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
			const data = await resp.json();
			setStore({ message: data.message });
			// don't forget to return something, that is how the async resolves
			return data;
		  } catch (error) {
			console.log("Error loading message from backend", error);
		  }
		},
		changeColor: (index, color) => {
		  //get the store
		  const store = getStore();
  
		  //we have to loop the entire demo array to look for the respective index
		  //and change its color
		  const demo = store.demo.map((elm, i) => {
			if (i === index) elm.background = color;
			return elm;
		  });
  
		  //reset the global store
		  setStore({ demo: demo });
		},
	  },
	};
  };
  
  export default getState;
  