import React, {useState, useEffect} from "react";
import MaterialTable from "material-table";
import Typography from '@material-ui/core/Typography';
import API from "../../utils/API"

// this needs to be changed to parent schedule. only here for sample
import TeacherSchedule from '../TeacherSchedule';

function Table() {
    const [state, setState] = useState({
        columns: [
            // {title:"Details", field:"studentSchedule"},
            {title:"Student Name", field:"childName"},
            {title:"Parent Name", field:"parentName"},
            {title:"Email", field:"email"},
        ],data:[]
    });
    
    useEffect(() => {
        async function getData() {

            // backend to get json data for table
            const {data} = await API.getUsers()


            // const url="https://randomuser.me/api/?results=200&nat=us";
            // const response = await fetch(url);
            // const data = await response.json();
            console.log(data);

            const filteredData = data.filter(user => user.userType === "parent")

            const users = filteredData.map(user => {
                return {
                    childName: user.studentName,
                    parentName: user.parentName,
                    email: user.email
                }
            })
            setState({...state, data: users})
        }
        getData();
    },[]);

    return (
        <MaterialTable 
            title="Dashboard"
            columns={state.columns}
            data={state.data}
            detailPanel={rowData => {
                return (
                    <div className="studentDetail">
                        <Typography variant="h4" gutterBottom>Student Schedule</Typography>
                        <div className="studentSchedule">

                            {/* parent selected schedule here */}
                            <TeacherSchedule />

                        </div>

                    </div>
                )
            }}
        />

        
    );
}

export default Table;