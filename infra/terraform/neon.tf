resource "neon_project" "main" {
  name      = var.project_name
  region_id = "aws-us-east-1"
}

resource "neon_database" "app" {
  project_id = neon_project.main.id
  branch_id  = neon_project.main.default_branch_id
  name       = "youness_garage"
  owner_name = neon_project.main.database_user
}

output "database_url" {
  description = "PostgreSQL connection string for the application"
  value       = "postgresql://${neon_project.main.database_user}:${neon_project.main.database_password}@${neon_project.main.database_host}/${neon_database.app.name}?sslmode=require"
  sensitive   = true
}
