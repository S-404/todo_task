import React, {useEffect, useState} from 'react';
import MyModal from "./UI/modal/myModal";
import TaskCreationForm from "./taskCreationForm";
import TaskPropertiesForm from "./taskPropertiesForm";
import LinkPropertiesForm from "./linkPropertiesForm";
import LinkCreationForm from "./linkCreationForm";
import GroupPropertiesForm from "./groupPropertiesForm";
import {useFetching} from "./hooks/useFetching";
import Query from "../backend/query";

const ModalPropForms = ({
                            selectedUG,
                            taskList,
                            setTaskList,
                            taskLinks,
                            setTaskLinks,
                            selectedTask,
                            setSelectedTask,
                            modalForms,
                            setVisible,
                            uniqTaskGroups,
                            leaveGroup
                        }) => {
    const [participants, setParticipants] = useState([]);
    const [selectedLinkID, setSelectedLinkID] = useState(0);

    const createTask = (taskObj) => {
        setTaskList([...taskList, taskObj]);
        setVisible('newTask', false);
    };
    const updateTask = (taskObj) => {
        setTaskList([...taskList.filter((task) => task.ID !== taskObj.ID), taskObj]);
        setVisible('taskProp', false);
    };
    const removeTask = (taskObj) => {
        if (!window.confirm('Task will be removed')) return;
        setTaskList(taskList.filter((task) => task.ID !== taskObj.ID));
        setVisible('taskProp', false);
    };

    const createLink = (linkObj) => {
        setSelectedTask({...selectedTask, taskLinks: [...selectedTask.taskLinks, linkObj]})
        setTaskLinks([...taskLinks, linkObj])
        setVisible('newLink', false)
    };

    const updateLink = (linkObj) => {
        let newTaskLinksObj = [...selectedTask.taskLinks.filter((link) => link.ID !== linkObj.ID), linkObj]
        setSelectedTask({...selectedTask, taskLinks: newTaskLinksObj})
        setTaskLinks([...taskLinks.filter((link) => link.ID !== linkObj.ID), linkObj]);
        setVisible('linkProp', false)
    };

    const removeLink = (linkObj) => {
        if (!window.confirm('Link will be removed')) return;
        let newTaskLinksObj = [...selectedTask.taskLinks.filter((link) => link.ID !== linkObj.ID)]
        setSelectedTask({...selectedTask, taskLinks: newTaskLinksObj})
        setTaskLinks(taskLinks.filter((link) => link.ID !== linkObj.ID));
        setVisible('linkProp', false)
    };

    const [fetchParticipants, isParticipantsLoading, participantsError] = useFetching(async () => {
        const responseData = await Query.getData({
            query: `/user/useraccess/userlist/${selectedUG}`,
        });
        setParticipants(responseData);
    });

    useEffect(async () => {
        if (selectedUG) {
            fetchParticipants();
        }
    }, [selectedUG])

    return (<div>
        <MyModal visible={modalForms.newTask} name='newTask' setVisible={setVisible}>
            <TaskCreationForm createTask={createTask} uniqTaskGroups={uniqTaskGroups}/>
        </MyModal>
        <MyModal visible={modalForms.taskProp} name='taskProp' setVisible={setVisible}>
            <TaskPropertiesForm
                selectedTask={selectedTask}
                setSelectedTask={setSelectedTask}
                uniqTaskGroups={uniqTaskGroups}
                updateTask={updateTask}
                removeTask={removeTask}
                setVisible={setVisible}
                setSelectedLinkID={setSelectedLinkID}
            />
        </MyModal>
        <MyModal visible={modalForms.linkProp} name='linkProp' setVisible={setVisible}>
            <LinkPropertiesForm
                selectedTask={selectedTask}
                selectedLinkID={selectedLinkID}
                updateLink={updateLink}
                removeLink={removeLink}
            />
        </MyModal>
        <MyModal visible={modalForms.newLink} name='newLink' setVisible={setVisible}>
            <LinkCreationForm
                selectedTask={selectedTask}
                selectedUG={selectedUG}
                createLink={createLink}
            />
        </MyModal>
        <MyModal visible={modalForms.groupProp} name='groupProp' setVisible={setVisible}>
            <GroupPropertiesForm
                setParticipants={setParticipants}
                participants={participants}
                isParticipantsLoading={isParticipantsLoading}
                leaveGroup={leaveGroup}
            />
        </MyModal>
    </div>);
};

export default ModalPropForms;