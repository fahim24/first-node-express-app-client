import "./App.css";
import { useEffect, useState } from "react";

function App() {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		fetch("http://localhost:5000/users")
			.then((res) => res.json())
			.then((data) => setUsers(data));
	}, []);

	const handleAddUser = (event) => {
		event.preventDefault();
		const name = event.target.name.value;
		const email = event.target.email.value;
		const user = { name, email };

		fetch("http://localhost:5000/user", {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify(user),
		})
			.then((res) => res.json())
			.then((data) => {
				const newUsers = [...users, data];
				setUsers(newUsers);
				console.log(data);
			});
	};

	return (
		<div className="App">
			<h2>users : {users.length}</h2>
			<form onSubmit={handleAddUser}>
				<input type="text" name="name" placeholder="Name" required />
				<input type="text" name="email" placeholder="Email" required />
				<input type="submit" value="Add User" />
			</form>
			<ul>
				{users.map((user) => (
					<li key={user.id}>name: {user.name} </li>
				))}
			</ul>
		</div>
	);
}

export default App;
