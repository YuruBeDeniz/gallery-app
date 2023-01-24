import { useState } from "react";
import { Project } from "./Project";
import ProjectCard from "./ProjectCard";
import ProjectForm from "./ProjectForm";

interface ProjectListProps {
    projects: Project[];
    onSave: (project: Project) => void;
}
 
export default function ProjectList({ projects, onSave }: ProjectListProps) {
    const [projectBeingEdited, setProjectBeingEdited] = useState({});

    const handleEdit = (project: Project) => {
        //console.log(project);
        setProjectBeingEdited(project);
    }

    const cancelEditing = () => {
        setProjectBeingEdited({});
    }

    const items = projects.map((project) => (
        <div key={project.id} className="cols-sm">
        {project === projectBeingEdited ? 
            <ProjectForm onCancel={cancelEditing} onSave={onSave} project={project} /> :
            <ProjectCard project={project} onEdit={handleEdit} />}
        </div>
    ));
    return <div className="row">{items}</div>;
}
