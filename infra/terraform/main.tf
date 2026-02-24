terraform {
  required_version = ">= 1.0"

  required_providers {
    neon = {
      source  = "kislerdm/neon"
      version = "~> 0.13.0"
    }
    render = {
      source  = "render-oss/render"
      version = "~> 1.8.0"
    }
    vercel = {
      source  = "vercel/vercel"
      version = "~> 4.6.0"
    }
  }
}

provider "neon" {
  api_key = var.neon_api_key
}

provider "render" {
  api_key = var.render_api_key
}

provider "vercel" {
  api_token = var.vercel_api_token
}
