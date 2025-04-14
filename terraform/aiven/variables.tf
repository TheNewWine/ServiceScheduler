variable "aiven_api_token" {
  description = "Aiven API token"
  type        = string
  sensitive   = true
}

variable "aiven_project_name" {
  description = "Aiven project name"
  type        = string
}

variable "cloud_name" {
  description = "Cloud provider and region"
  type        = string
  default     = "do-nyc" 
} 