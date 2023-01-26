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
  const [errors, setErrors] = useState({
    name: '',
    description: '',
    budget: '',
  })

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    if(!isValid()) return; //Call the isValid function on form submit and return back out of the function before saving changes if the form is invalid.
    onSave(project);
  };

  const handleChange = (event: any) => {
    const { type, value, checked, name } = event.target;
    console.log(event.target.name)

    let updatedValue = type === 'checkbox' ? checked : value;
    
    if(type === 'number') updatedValue = Number(updatedValue);
    console.log('updated value:', updatedValue)
    const change = {
        [name]: updatedValue,
    };
    console.log('change: ', change)

    let updatedProject: Project;
    // need to do functional update b/c
    // the new project state is based on the previous project state
    // so we can keep the project properties that aren't being edited +like project.id
    // the spread operator (...) is used to
    // spread the previous project properties and the new change
    setProject((p) => {
      console.log('p: ', p)
        updatedProject = new Project({ ...p, ...change });
        console.log('(updatedProject: ', updatedProject)
        return updatedProject;
    });
    setErrors(() => validate(updatedProject));
  };

  function validate(project: Project) {
    let errors: any = { name: '', description: '', budget: '' };
    if (project.name.length === 0) {
      errors.name = 'Name is required';
    }
    if (project.name.length > 0 && project.name.length < 3) {
      errors.name = 'Name needs to be at least 3 characters.';
    }
    if (project.description.length === 0) {
      errors.description = 'Description is required.';
    }
    if (project.budget === 0) {
      errors.budget = 'Budget must be more than $0.';
    }
    return errors;
  }; 

  function isValid() {
    return (
      errors.name.length === 0 &&
      errors.description.length === 0 &&
      errors.budget.length === 0
    );
  }
  
  return (
    <form onSubmit={handleSubmit} className="input-group vertical">
      <label htmlFor="name">Project Name</label>
      <input value={project.name} onChange={handleChange} type="text" name="name" placeholder="enter name" />
      {errors.name.length > 0 && (
        <div className="card error">
          <p>{errors.name}</p>
        </div>
      )}

      <label htmlFor="description">Project Description</label>
      <textarea value={project.description} onChange={handleChange} name="description" placeholder="enter description" />
      {errors.name.length > 0 && (
        <div className="card error">
          <p>{errors.description}</p>
        </div>
      )}
      
      <label htmlFor="budget">Project Budget</label>
      <input value={project.budget} onChange={handleChange} type="number" name="budget" placeholder="enter budget" />
      {errors.name.length > 0 && (
        <div className="card error">
          <p>{errors.budget}</p>
        </div>
      )}
      
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
