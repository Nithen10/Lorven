export type Job = {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  workMode: string;
  about: string;
  responsibilities: string[];
  skills: string[];
  offers: string[];
};

export const departments = [
  "Business Development",
  "Engineering",
  "Finance",
  "Marketing",
  "Product",
  "Sales",
];

export const locations = ["Hyderabad"];

export const jobs: Job[] = [
  {
    id: "senior-ai-ml-engineer",
    title: "Senior AI / ML Engineer",
    department: "Engineering",
    location: "Hyderabad",
    type: "Full Time",
    workMode: "On-Site",
    about:
      "Lorven AI Studio is a Hyderabad-based AI-native film studio revolutionizing the movie industry with AI-powered tools across the entire filmmaking pipeline — from scriptwriting to post-production.",
    responsibilities: [
      "Design and deploy ML models for image & video generation",
      "Build CI/CD pipelines for ML deployment and monitoring",
      "Develop and optimize LoRA fine-tuned generative models",
      "Implement IP adapters and face consistency systems",
      "Develop storyboard and scene visualization algorithms",
      "Work with agent-based AI orchestration frameworks",
      "Build scalable ML infrastructure",
      "Mentor junior engineers",
    ],
    skills: [
      "5+ years in AI / ML engineering",
      "PyTorch / TensorFlow expertise",
      "Generative AI (Stable Diffusion, DALL·E, Midjourney)",
      "LoRA, IP adapters, fine-tuning",
      "MLOps tools (MLflow, W&B, Kubeflow)",
      "Cloud platforms (AWS / GCP / Azure)",
    ],
    offers: [
      "Cutting-edge AI work in film industry",
      "Competitive salary & benefits",
      "Collaborative & innovative culture",
      "Strong growth & learning opportunities",
    ],
  },
];

export function getJobBySlug(slug: string): Job | undefined {
  return jobs.find((j) => j.id === slug);
}
