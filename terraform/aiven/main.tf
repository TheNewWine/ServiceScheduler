terraform {
  required_providers {
    aiven = {
      source  = "aiven/aiven"
      version = "~> 4.0.0"
    }
  }
}

provider "aiven" {
  api_token = var.aiven_api_token
}

# PostgreSQL Service
resource "aiven_pg" "service_scheduler_db" {
  project      = var.aiven_project_name
  cloud_name   = var.cloud_name
  plan         = "free-1-5gb"
  service_name = "service-scheduler-pg"

  pg_user_config {
    pg_version = "15"
  }
}

# Database
resource "aiven_pg_database" "service_scheduler" {
  project       = aiven_pg.service_scheduler_db.project
  service_name  = aiven_pg.service_scheduler_db.service_name
  database_name = "service_scheduler"
}

# Output the connection details
output "database_host" {
  value = aiven_pg.service_scheduler_db.service_host
}

output "database_port" {
  value = aiven_pg.service_scheduler_db.service_port
}

output "database_name" {
  value = aiven_pg_database.service_scheduler.database_name
}

output "database_user" {
  value = aiven_pg.service_scheduler_db.service_username
}

output "database_password" {
  value     = aiven_pg.service_scheduler_db.service_password
  sensitive = true
} 