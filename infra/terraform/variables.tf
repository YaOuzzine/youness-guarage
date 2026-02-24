variable "neon_api_key" {
  description = "Neon API key for provisioning database resources"
  type        = string
  sensitive   = true
}

variable "render_api_key" {
  description = "Render API key for provisioning web services"
  type        = string
  sensitive   = true
}

variable "vercel_api_token" {
  description = "Vercel API token for provisioning frontend projects"
  type        = string
  sensitive   = true
}

variable "project_name" {
  description = "Base name for all provisioned resources"
  type        = string
  default     = "youness-garage"
}

variable "github_repo" {
  description = "GitHub repository in owner/repo format"
  type        = string
}

variable "stripe_secret_key" {
  description = "Stripe secret key passed to the API service"
  type        = string
  sensitive   = true
  default     = ""
}

variable "stripe_webhook_secret" {
  description = "Stripe webhook signing secret passed to the API service"
  type        = string
  sensitive   = true
  default     = ""
}
