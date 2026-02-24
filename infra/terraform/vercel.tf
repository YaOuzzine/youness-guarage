resource "vercel_project" "web_client" {
  name      = "${var.project_name}-web-client"
  framework = "nextjs"

  git_repository = {
    type = "github"
    repo = var.github_repo
  }

  root_directory = "apps/web-client"
  build_command  = "pnpm turbo build --filter=@youness-garage/web-client"
  output_directory = "apps/web-client/.next"
}

resource "vercel_project_environment_variable" "client_api_url" {
  project_id = vercel_project.web_client.id
  key        = "NEXT_PUBLIC_API_URL"
  value      = render_web_service.api.url
  target     = ["production", "preview"]
}

resource "vercel_project" "web_admin" {
  name      = "${var.project_name}-web-admin"
  framework = "nextjs"

  git_repository = {
    type = "github"
    repo = var.github_repo
  }

  root_directory = "apps/web-admin"
  build_command  = "pnpm turbo build --filter=@youness-garage/web-admin"
  output_directory = "apps/web-admin/.next"
}

resource "vercel_project_environment_variable" "admin_api_url" {
  project_id = vercel_project.web_admin.id
  key        = "NEXT_PUBLIC_API_URL"
  value      = render_web_service.api.url
  target     = ["production", "preview"]
}
