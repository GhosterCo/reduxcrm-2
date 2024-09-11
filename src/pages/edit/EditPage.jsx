import Form from '../../components/form/Form'
import { useLocation } from "react-router-dom";

const EditPage = () => {
  const location = useLocation();
  const { user } = location.state || {};
  //TODO: NO AGE IN API 
  // console.log('user: ', user.age);

  return (
    <Form title="Edit User" id={user.id} name={user.name} age={user.age} email={user.email} />
  )
}

export default EditPage
