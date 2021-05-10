#!/usr/bin/env pwsh

param (
	[string] $ServerUrl = "http://localhost:5000",
	[string] $DockerNetwork = "host",
	[string] $DockerImage = "swaggerapi/swagger-codegen-cli:2.4.19",
	[string] $DockerExec = "docker",
	[switch] $SkipBuilding
)

$loc = $PSScriptRoot

function Sync-Project {
	param (
		$ProjectName,
		$SwaggerDocPath
	)

	&$DockerExec run --rm --tty `
		--volume ${loc}:/local `
		--network $DockerNetwork `
		$DockerImage `
		generate `
			--input-spec $ServerUrl$SwaggerDocPath `
			--lang typescript-angular `
			--output /local/projects/$ProjectName/src `
			--additional-properties ngVersion=9.0.3

	if (-not $?) {
		throw "Failed to pull Swagger definitions for '$ProjectName'"
	}

	if ($SkipBuilding) {
		Write-Host "Skipping 'npx ng build $ProjectName' as `$SkipBuilding was enabled"
	} else {
		npx ng build $ProjectName

		if (-not $?) {
			throw "Failed to build project '$ProjectName'"
		}
	}
}

Sync-Project -ProjectName api-client -SwaggerDocPath /api/swagger/doc.json
Sync-Project -ProjectName import-azuredevops-client -SwaggerDocPath /import/azuredevops/swagger/doc.json
Sync-Project -ProjectName import-github-client -SwaggerDocPath /import/github/swagger/doc.json
Sync-Project -ProjectName import-gitlab-client -SwaggerDocPath /import/gitlab/swagger/doc.json
