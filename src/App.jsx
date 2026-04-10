import { useEffect, useState} from "react";
import axios from "./axios";
import "./app.css";
import { EditableText } from "@blueprintjs/core";

function App() {
  const [users, setUsers] = useState(null);

  const [newname, setNewname] = useState("");
  const [newemail, setNewemail] = useState("");
  const [newwebsite, setNewwebsite] = useState("");

  const [user,setUser]=useState();

  useEffect(() => {

    
    async function fetchApi() {
      const response = await axios.get("./users");
      setUsers(response.data);
    }

    fetchApi();
  }, []);
  async function postUser() {
    try {
      if (newname && newemail && newwebsite) {
        const response = await axios.post("/users", {
          name: newname,
          email: newemail,
          website: newwebsite,
        });
        setUsers([...users, response.data]);
      } else {
        alert("hello");
      }

      setNewname("");
      setNewemail("");
      setNewwebsite("");
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteItem(Id) {
    try {
      const response = await axios.delete(`/users/${Id}`);

      setUsers(users.filter((user) => user.id !== Id));
    } catch (err) {
      console.log(err);
    }
  }

  async function updateItem(id){


    try{
      const response=await axios.put(`./users/${id}`,
        user
      )
      
    }
    catch(err){
      console.log(err)
    }
  }

  function updateElement(id,key,value){

    setUsers((users)=>users.map((user)=>user.id===id?{...user,[key]:value}:user))

    setUser({key,value})
  
  }
  return (
    <>
      <h1>user management</h1>
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>email</th>
            <th>website</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map(({ id, name, email, website }) => (
              <tr key={id}>
                <td>{name}</td>
                <td>
                  <EditableText name="email"value={email}
                  onChange={(value)=>updateElement(id,'email',value)}
                  ></EditableText>
                </td>

                <td>
                  <EditableText name="website" value={website}
                  onChange={(value)=>updateElement(id,"website",value)}></EditableText>
                </td>

                <td>
                  <button onClick={()=>updateItem(id)}>
                    update
                  </button>
                </td>
                <td>
                  <button onClick={() => deleteItem(id)}>delete</button>
                </td>
              </tr>
            ))}
        </tbody>
        <tfoot>
          <tr>
            <td>
              <input
                type="text"
                value={newname}
                onChange={(e) => setNewname(e.target.value)}
              />
            </td>
            <td>
              <input
                type="text"
                value={newemail}
                onChange={(e) => setNewemail(e.target.value)}
              />
            </td>
            <td>
              <input
                type="text"
                name=""
                id=""
                value={newwebsite}
                onChange={(e) => setNewwebsite(e.target.value)}
              />
            </td>
            <td>
              <button onClick={postUser}>post</button>
            </td>
          </tr>
        </tfoot>
      </table>
    </>
  );
}

export default App;
