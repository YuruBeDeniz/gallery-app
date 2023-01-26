import { Link } from "react-router-dom";
import { Project } from "./Project";

interface ProjectCardProps {
    project: Project;
    onEdit: (project: Project) => void;
};

function formatDescription(description: string): string {
    return description.substring(0, 60) + '...';
};


export default function ProjectCard({ project, onEdit }: ProjectCardProps) {
   const handleEditClick = (projectBeingEdited: Project) => {
    onEdit(projectBeingEdited);
  }

  return (
    <div key={project.id} className="cols-sm">
      <div className="card">
        <img src={project.imageUrl} alt={project.name} />
        <section className="section dark">
          <Link to={'/projects/' + project.id} >
            <h5 className="strong">
              <strong>{project.name}</strong>
            </h5>
            <p>{formatDescription(project.description)}</p>
          </Link>
          <p>Budget : {project.budget.toLocaleString()}</p>
          <button 
            onClick={() => handleEditClick(project)}
            className="bordered">
          <span className="icon-edit "></span>
           Edit
          </button>
        </section>
      </div>
    </div>
  )
}
function onEdit(projectBeingEdited: Project) {
    throw new Error("Function not implemented.");
}

