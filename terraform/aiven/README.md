# Aiven PostgreSQL Terraform Configuration

This directory contains Terraform configuration for managing the Aiven PostgreSQL database for the Service Scheduler application.

## Files

- `main.tf` - Main Terraform configuration
- `variables.tf` - Variable definitions
- `terraform.tfvars` - Variable values (DO NOT COMMIT)
- `.terraformignore` - Files to ignore in Terraform operations

## Setup

1. Create `terraform.tfvars` with your Aiven credentials:
   ```hcl
   aiven_api_token    = "your-api-token"
   aiven_project_name = "your-project-name"
   ```

2. Initialize Terraform:
   ```bash
   terraform init
   ```

3. Plan the changes:
   ```bash
   terraform plan
   ```

4. Apply the changes:
   ```bash
   terraform apply
   ```

## Important Notes

- Never commit `terraform.tfvars` or state files
- Keep your API token secure
- The configuration uses Aiven's free tier plan
- Database is created in DigitalOcean Frankfurt region 