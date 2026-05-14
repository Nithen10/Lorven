export type Job = {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  workMode: string;
  experience: string;
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

export const experiences = ["Entry", "Mid", "Senior", "Lead"] as const;

export const jobs: Job[] = [
  {
    id: "senior-ai-ml-engineer",
    title: "Senior AI / ML Engineer",
    department: "Engineering",
    location: "Hyderabad",
    type: "Full Time",
    workMode: "On-Site",
    experience: "Senior",
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
  {
    id: "deployment-engineer",
    title: "Deployment Engineer",
    department: "Engineering",
    location: "Hyderabad",
    type: "Full Time",
    workMode: "On-Site",
    experience: "Mid",
    about:
      "Help Lorven AI Studio ship faster and stay up. You will own the infrastructure that takes our generative-AI and production tools from a developer's laptop to studios using them on set — keeping pipelines fast, observable, and resilient.",
    responsibilities: [
      "Build and maintain CI/CD pipelines for application and ML services",
      "Manage Kubernetes clusters on AWS (EKS) across staging and production",
      "Author and review infrastructure-as-code with Terraform",
      "Instrument services with Prometheus, Grafana, and OpenTelemetry",
      "Triage production incidents and lead blameless postmortems",
      "Automate release, rollback, and canary deployment workflows",
      "Harden secrets management, IAM policies, and audit logging",
      "Participate in a light on-call rotation with one teammate",
    ],
    skills: [
      "2+ years in DevOps, SRE, or platform engineering",
      "Kubernetes in production (EKS, GKE, or self-managed)",
      "Terraform and at least one config tool (Helm, Kustomize, Ansible)",
      "GitHub Actions or comparable CI (CircleCI, GitLab CI, Jenkins)",
      "Prometheus / Grafana / Loki observability stack",
      "Strong Python or Go scripting; comfortable in Bash",
      "AWS fundamentals (IAM, VPC, S3, EKS, RDS); exposure to MLOps a plus",
    ],
    offers: [
      "Own the platform from day one",
      "Modern stack, no legacy baggage",
      "Competitive salary & benefits",
      "Direct exposure to AI/ML research workflows",
    ],
  },
];

export function getJobBySlug(slug: string): Job | undefined {
  return jobs.find((j) => j.id === slug);
}
