resource "render_web_service" "api" {
  name   = "${var.project_name}-api"
  region = "oregon"

  runtime_source = {
    docker = {
      repo_url       = "https://github.com/${var.github_repo}"
      branch         = "main"
      dockerfile_path = "apps/api/Dockerfile"
      context        = "."
    }
  }

  env_vars = {
    DATABASE_URL = {
      value = "postgresql://${neon_project.main.database_user}:${neon_project.main.database_password}@${neon_project.main.database_host}/${neon_database.app.name}?sslmode=require"
    }
    STRIPE_SECRET_KEY = {
      value = var.stripe_secret_key
    }
    STRIPE_WEBHOOK_SECRET = {
      value = var.stripe_webhook_secret
    }
    NODE_ENV = {
      value = "production"
    }
    API_PORT = {
      value = "4000"
    }
  }

  plan    = "starter"
  num_instances = 1

  health_check_path = "/api/health"
}

output "api_url" {
  description = "Public URL of the deployed API"
  value       = render_web_service.api.url
}
