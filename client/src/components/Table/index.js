import React, {useState, useEffect} from "react";
import MaterialTable from "material-table";
import Typography from '@material-ui/core/Typography';

function Table() {
    const [state, setState] = useState({
        columns: [
            {title:"Details", field:""},
            {title:"Student Name", field:"childName"},
            {title:"Parent Name", field:"parentName"},
            {title:"Email", field:"email"},
        ],data:[]
    });
    
    useEffect(() => {
        async function getData() {

            // backend to get json data for table

            const url="https://randomuser.me/api/?results=200&nat=us";
            const response = await fetch(url);
            const data = await response.json();
            console.log(data.results);

            const users = data.results.map(user => {
                return {
                    childName: user.name.childName,
                    parentName: user.name.parentName,
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
            detailPanel={data => {
                return (
                    <div className="studentDetail">
                        <Typography variant="h4" gutterBottom>Student Schedule</Typography>
                        <Typography variant="h6" gutterBottom>{data.childName}</Typography>
                        <div className="studentSchedule">

                            {/* parent selected schedule here */}

                        </div>

                    </div>
                )
            }}
        />

        
    );
}

export default Table;