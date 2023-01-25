import { SyntheticEvent, useState } from "react";
import { Project } from "./Project";

interface ProjectFormProps {
    onCancel: () => void;
    onSave: (project: Project) => void;
    project: Project;
}

export default function ProjectForm(props: ProjectFormProps) {
  const {onCancel, onSave, project: initialProject } = props;
  //Destructure the project prop in the function component signature and rename it initialProject so that we can name our state variable project. 

  const [project, setProject] = useState(initialProject);

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    onSave(project);
  };

  const handleChange = (event: any) => {
    const { type, value, checked, name } = event.target;

    let updatedValue = type === 'checkbox' ? checked : value;
    
    if(type === 'number') updatedValue = Number(updatedValue);

    const change = {
        [name]: updatedValue,
    };

    let updatedProject: Project;
    // need to do functional update b/c
    // the new project state is based on the previous project state
    // so we can keep the project properties that aren't being edited +like project.id
    // the spread operator (...) is used to
    // spread the previous project properties and the new change
    setProject((p) => {
        updatedProject = new Project({ ...p, ...change });
        return updatedProject;
    })
  };
  
  return (
    <form onSubmit={handleSubmit} className="input-group vertical">
      <label htmlFor="name">Project Name</label>
      <input value={project.name} onChange={handleChange} type="text" name="name" placeholder="enter name" />
      <label htmlFor="description">Project Description</label>
      <textarea value={project.description} onChange={handleChange} name="description" placeholder="enter description" />
      <label htmlFor="budget">Project Budget</label>
      <input value={project.budget} onChange={handleChange} type="number" name="budget" placeholder="enter budget" />
      <label htmlFor="isActive">Active?</label>
      <input checked={project.isActive} onChange={handleChange} type="checkbox" name="isActive" />
      <div className="input-group">
        <button className="primary bordered medium">Save</button>
        <span />
        <button 
            onClick={onCancel} 
            type="button" 
            className="bordered medium">cancel</button>
      </div>
    </form>
  )
}
