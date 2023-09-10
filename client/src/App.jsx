import { gql, useQuery } from "@apollo/client";
const query = gql`
  query getAllUsers {
    getAllUsers {
      id
      username
      password
      phone
    }
  }
`;

function App() {
  const { data, loading } = useQuery(query);
  if (loading) {
    return <h3>Loading...</h3>;
  }

  return (
    <>
      {data &&
        data.getAllUsers.map((item) => {
          return (
            <ul key={item.id}>
              <li>{item.username}</li>
              <li>{item.phone}</li>
            </ul>
          );
        })}
    </>
  );
}

export default App;
